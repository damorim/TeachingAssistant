#!/bin/bash

# install node dependencies on each module
(cd common; npm install)
(cd ta-gui; npm install)
(cd ta-server; npm install)
