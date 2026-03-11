# sites/tasks.py
# from celery import shared_task
# from .models import Site
# from .services.generator import generate_site
# from .services.deployer import deploy_site
#

# @shared_task(bind=True, autoretry_for=(Exception,), retry_kwargs={"max_retries": 3})
# def build_site_task(self, site_id):
#     site = Site.objects.get(id=site_id)
#     site.status = "building"
#     site.save()
#
#     path = generate_site(site)
#     deploy_site(site, path)
#
#     site.status = "ready"
#     site.save()


import logging
from celery import shared_task
import shutil
import os
import subprocess
from pathlib import Path

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=3)
def build_site_task(self, domain, template_name='next_saas', **kwargs):
    try:
        logger.info("Starting build_site_task for domain: %s", domain)

        TEMPLATES_DIR = Path("/backend/templates")
        SITES_DIR = Path("/backend/generated-sites")

        template_path = TEMPLATES_DIR / template_name
        if not isinstance(domain, str):
            domain = str(domain)  # или raise ValueError("Domain must be a string")
        site_path = SITES_DIR / domain

        logger.info("TEMPLATES_DIR = %s", TEMPLATES_DIR)
        logger.info("SITES_DIR = %s", SITES_DIR)
        logger.info("template_path = %s", template_path)
        logger.info("site_path = %s", site_path)

        # Проверки перед копированием
        if not template_path.exists():
            raise FileNotFoundError(f"Template directory not found: {template_path}")

        if not template_path.is_dir():
            raise NotADirectoryError(f"Template path is not a directory: {template_path}")

        logger.info("Template exists and is directory: OK")

        # Удаляем старую папку, если существует (самый простой способ избежать FileExistsError)
        if site_path.exists():
            logger.warning("Site path already exists, removing: %s", site_path)
            shutil.rmtree(site_path, ignore_errors=True)

        logger.info("Starting copytree...")
        shutil.copytree(template_path, site_path)
        logger.info("Copytree completed successfully")

        logger.info("Preparing to run docker compose...")

        try:
            compose_file = site_path / "docker-compose.yml"
            if not compose_file.exists():
                raise FileNotFoundError(f"docker-compose.yml not found in {site_path}")

            logger.info("Found docker-compose.yml: %s", compose_file)

            result = subprocess.run(
                ["docker", "compose", "up", "-d", "--build"],
                cwd=site_path,
                capture_output=True,
                text=True,
                check=True
            )

            logger.info("Docker compose up completed successfully")
            logger.info("stdout: %s", result.stdout)
            logger.info("stderr: %s", result.stderr)

        except subprocess.CalledProcessError as e:
            logger.error("Docker compose failed with exit code %d", e.returncode)
            logger.error("stdout: %s", e.stdout)
            logger.error("stderr: %s", e.stderr)
            raise self.retry(exc=e, countdown=60)

        except FileNotFoundError as e:
            logger.error("docker-compose.yml missing: %s", e)
            raise

        except Exception as e:
            logger.exception("Unexpected error running docker compose: %s", e)
            raise self.retry(exc=e, countdown=60)

        logger.info("Site build task fully completed for domain: %s", domain)

    except Exception as exc:
        logger.exception("Critical error in build_site_task: %s", exc)
        raise self.retry(exc=exc, countdown=60)  # или просто raise, если не хочешь retry