# sites/tasks.py
from celery import shared_task
from .models import Site
from .services.generator import generate_site
from .services.deployer import deploy_site


@shared_task(bind=True, autoretry_for=(Exception,), retry_kwargs={"max_retries": 3})
def build_site_task(self, site_id):
    site = Site.objects.get(id=site_id)
    site.status = "building"
    site.save()

    path = generate_site(site)
    deploy_site(site, path)

    site.status = "ready"
    site.save()
