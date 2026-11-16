@echo off
setlocal enabledelayedexpansion

set "OUTPUT=tacs_media.m3u"
echo #EXTM3U > "%OUTPUT%"

if exist "song files" (
    for %%F in ("song files\*.mp4") do (
        set "filename=%%~nF"
        set "cleanname=!filename:_= !"
        echo #EXTINF:-1 tvg-logo="https://cdn-icons-png.flaticon.com/512/3075/3075908.png" group-title="Karaoke Songs",!cleanname! >> "%OUTPUT%"
        echo song files/%%~nxF >> "%OUTPUT%"
    )
)

echo Tapos na, bossing! Na-generate na ang %OUTPUT%.
pause