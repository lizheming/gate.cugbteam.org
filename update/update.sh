#!/bin/bash
echo "Start deployment"
cd /usr/nginx/html/gate
sudo git pull origin master --force
echo "Finished"