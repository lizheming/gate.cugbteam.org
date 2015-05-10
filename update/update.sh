#!/bin/bash
echo "Start deployment"
cd /usr/nginx/html/gate
sudo -u osms -H git pull origin master --force
echo "Finished"