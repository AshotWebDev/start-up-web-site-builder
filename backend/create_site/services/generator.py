import shutil
import uuid
from pathlib import Path
import logging

logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent.parent.parent

TEMPLATES_DIR = BASE_DIR / "templates"
SITES_DIR = BASE_DIR / "generated-sites"


def generate_site(site):
    template_path = TEMPLATES_DIR / site.template
    site_path = SITES_DIR / site.domain

    logger.info(f"TEMPLATES_DIR = {TEMPLATES_DIR}")
    logger.info(f"SITES_DIR = {SITES_DIR}")
    logger.info(f"template_path = {template_path}")
    logger.info(f"site_path = {site_path}")

    if not template_path.exists():
        raise FileNotFoundError(f"Template not found: {template_path}")

    SITES_DIR.mkdir(parents=True, exist_ok=True)

    shutil.copytree(template_path, site_path)

    (site_path / ".env").write_text(
        f"SITE_NAME={site.name}\nDOMAIN={site.domain}\nSECRET_KEY={uuid.uuid4()}"
    )

    return site_path
