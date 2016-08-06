#!/bin/bash
#
# The MIT License (MIT)
#
# Copyright (c) 2016 Dominique Barton
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#

# Exit script on errors.
set -e

# Sanity check if we're root.
[[ $(id -u) == 0 ]] || (echo "ERROR: Please run this script as root!" >&2; exit 1)

# Install dependencies.
apt-get -y install build-essential python-dev python-flask git

# Install Adafruit Python DHT Sensor Library.
cd /tmp
git clone https://github.com/adafruit/Adafruit_Python_DHT.git
cd Adafruit_Python_DHT
python setup.py install

# Clone project directory.
git clone https://github.com/domibarton/rpi-humidity-logger.git /opt/rpi-humidity-logger
cd /opt/rpi-humidity-logger

# Initialize database.
app/logger init

# Install systemd service units.
cp systemd/* /etc/systemd/system
systemctl daemon-reload
systemctl enable rpi-humidity-logger-collector
systemctl enable rpi-humidity-logger-webui
systemctl start rpi-humidity-logger-collector
systemctl start rpi-humidity-logger-webui

# Configure access point.
read -p "Install and configure wireless access point (yes|no)? " AP
if [ "${AP:0:1}" == "y" ]
then
    apt-get -y install dnsmasq hostapd
    cat accesspoint/hosts >/etc/hosts
    cat accesspoint/dhcpcd.conf >/etc/dhcpcd.conf
    cat accesspoint/dnsmasq.conf >/etc/dnsmasq.conf
    cat accesspoint/default/hostapd >/etc/default/hostapd
    cat accesspoint/hostapd/hostapd.conf >/etc/hostapd/hostapd.conf
    cat accesspoint/network/interfaces >/etc/network/interfaces
    systemctl enable dnsmasq
    systemctl enable hostapd
    ifdown wlan0 && ifup wlan0
    systemctl restart dnsmasq
    systemctl restart hostapd
    echo "NOTICE: System might change the IP address now..."
    systemctl restart dhcpcd
fi
