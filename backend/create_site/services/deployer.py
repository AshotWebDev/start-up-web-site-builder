# sites/services/deployer.py
import subprocess

def deploy_site(site, path):
    subprocess.run(
        ["docker", "compose", "up", "-d", "--build"],
        cwd=path,
        check=True
    )
