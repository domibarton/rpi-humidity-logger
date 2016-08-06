Purpose
=======

This git repository can be used to setup and configure a `Raspberry Pi <https://www.raspberrypi.org/>`_ as a humidity and temperature logger.

Requirements
============

- a `Raspberry Pi <https://www.raspberrypi.org/>`_ (of course)
- an SD card with `Raspbian <https://www.raspbian.org/>`_ installed on it
- one or more DHT11, DHT22 or AM2302 temperature and humidity sensors

Installation
============

Update Raspbian
---------------

First of all, make sure your Raspbian is up to date:

.. code-block:: bash

    sudo apt-get update && sudo apt-get -y upgrade

Install RPi Humidity Logger
---------------------------

.. code-block:: bash

    curl https://raw.githubusercontent.com/domibarton/rpi-humidity-logger/develop/setup.sh | bash

Configuration
=============

Please have a look at the configuration file at `app/config.py`.

By default the collector is configured for a DHT11 on GPIO PIN 2.
It will poll the sensor in a 5 minute interval.

Usage
=====

You should be able to connect to the Raspberry Pi via HTTP (port 80).

License
=======

The MIT License (MIT)