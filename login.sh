#!/bin/bash
echo "login:$USER:$HOME" | nc -U /RV/APScontrol/log.socket
exit 0;
