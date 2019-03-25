#!/usr/bin/python
import sys
from langdetect import detect
print(detect(sys.argv[1].decode("utf-8")))
