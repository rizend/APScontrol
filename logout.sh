#!/bin/bash
echo "logout:$USER" | nc -U /RV/APScontrol/log.socket
exit 0;
