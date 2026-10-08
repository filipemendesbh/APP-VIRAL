#!/usr/bin/env python3
"""Save a Google Drive connector download (JSON with base64 `content`) into illustrations/.

usage: python3 storybook/import_drive.py <download.json> [filename]
The filename defaults to the Drive file title (e.g. spread-07.jpg).
"""
import base64, json, os, sys

src = sys.argv[1]
data = json.load(open(src))
name = sys.argv[2] if len(sys.argv) > 2 else data['title']
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'illustrations', os.path.basename(name))
with open(out, 'wb') as f:
    f.write(base64.b64decode(data['content']))
print('saved', out)
