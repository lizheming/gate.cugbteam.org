#!/bin/bash
cd /usr/nginx/html/gate
su osms
git reset --hard origin/master
git clean -f
git pull origin master
exit