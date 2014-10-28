#!/bin/bash
apt-get -y install nodejs npm
chmod +x /RV/APScontrol/*.sh
cp /RV/inst/APScontrol/20-lubuntu.conf /etc/lightdm/lightdm.conf.d/
cd /RV/APSconstrol/
npm install
