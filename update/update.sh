#!/bin/bash
echo "Start deployment"
cd /usr/nginx/html/gate
git pull origin master --force
echo "Finished"