#!/usr/bin/python
# -*- coding: utf-8 -*-
""" 
convert sutta parallel csv data to json
and creates node files for use in gephi.

"""
import os
import re
import csv
import json

base_dir = os.environ['HOME']
suttadir = base_dir+'/Desktop/toconvert/'

fileWriteCsv = open(base_dir+'/pali-networks/bin/convertedcsv/edges.csv', 'w')
fileWriteCsv.write('Source,Target\n')

for name in os.listdir(suttadir):
		print(name)
		fileWrite = open(base_dir+'/pali-networks/suttas/'+name[:-4]+'.json', 'w', encoding='utf-8')
		fileWrite.write('[')

		segmentnr = ''
		suttaDict = {}

		with open(suttadir+name, newline='', encoding='utf-8') as csvfile:
			suttareader = csv.reader(csvfile)
			rowcount = 0
			for row in suttareader:
				baseParsegnrList = [];
				if rowcount != 0:
					fileWrite.write(',')
				try:
					segmentnr = row[1].split(':')
					suttaDict["segmentnr"] = segmentnr[1]
					suttaDict["segment"] = row[2].replace('߷','')
					suttaDict["segment"] = row[2].replace('\*\*','')
					parallelsArray = []
					for parallel in range(3,len(row)):
						parDict = {}
						probability = re.findall(r'([0-9.]*?)#', row[parallel])
						if probability:
							parDict["probability"] = probability[0]
						parsegnr = re.findall(r'LC([a-z0-9.:\-]*?)[ #]', row[parallel])
						
						if parsegnr:
							parDict["parsegnr"] = parsegnr[0]
							baseParsegnr = re.findall(r'([a-z0-9.\-]*?):', parsegnr[0])
							if baseParsegnr and float(probability[0]) < 0.065:
								baseParsegnrList.append(baseParsegnr[0])

						parsegment = re.findall(r'#   (.*)', row[parallel])
						if parsegment:
							parDict["parsegment"] = parsegment[0].replace('߷','')
						parallelsArray.append(parDict)
					suttaDict["parallels"] = parallelsArray
					fileWrite.write(json.dumps(suttaDict, indent=4, ensure_ascii=False)+'\n')
					baseParsegnrList = list(dict.fromkeys(baseParsegnrList))
					if len(baseParsegnrList) < 10:
						for item in baseParsegnrList:
							if item > name[:-4]:
								fileWriteCsv.write(name[:-4]+','+item+'\n')
							else:
								fileWriteCsv.write(item+','+name[:-4]+'\n')
					rowcount += 1
				except:
					print('none')

		fileWrite.write(']')
		fileWrite.close()

fileWriteCsv.close()

fileWriteCsvNodes = open(base_dir+'/pali-networks/bin/convertedcsv/nodes.csv', 'w')
fileWriteCsvNodes.write('id,label\n')

itemList = []

with open(base_dir+'/pali-networks/bin/convertedcsv/edges.csv', newline='') as csvfile:
	edgesreader = csv.reader(csvfile)
	for row in edgesreader:
		if row[0] not in itemList and row[0] != 'Source':
			itemList.append(row[0])
		if row[1] not in itemList and row[1] != 'Target':
			itemList.append(row[1])

for item in itemList:
	fileWriteCsvNodes.write(item+','+item+'\n')

fileWriteCsvNodes.close()


