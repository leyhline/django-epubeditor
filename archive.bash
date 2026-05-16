#!/bin/bash

find .  \(  -name '*.py'                   -or \
            -path './static/*'             -or \
            -path './templates/*'          -or \
            -path './templatetags/*'       -or \
            -path './epubcheck-server.jar' -or \
            -path './epubcheck-server.jar' -or \
            -path './requirements.txt' \
        \) \
        ! -path '*/__pycache__/*' ! -path './.venv/*' ! -path './node_modules/*' \
    | zip -FS epubeditor.zip -@