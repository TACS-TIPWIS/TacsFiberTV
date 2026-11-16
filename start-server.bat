@echo off
title TacsFiber IPTV & Videoke Server
cd /d "%~dp0"
echo 🚀 Binubuksan ang TacsFiber Local Server sa port 8081...
npx http-server -p 8081
pause