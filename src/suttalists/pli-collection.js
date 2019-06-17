import { LitElement, html } from 'lit-element';
// position is the place where the element starts. Default is 25/factor pixels between elements.
// the parallels two columns represent the number of parallels and the total number of parallels from the top of that list.
// the latter is only used in the layered layout and not the centered layout.
export const pliCollection = 
{	
	"dn": {
			"collection": "dn",
			"name": "Digha",
			"parallelstotal": 200,
			"position": 0,
			"color": "#ff0000",
			"parallels": {
					"dn": [10,0],
					"mn": [40,10],
					"sn": [100,50],
					"an": [50,150]
					}
			},
	"mn": {
			"collection": "mn",
			"name": "Majjhima",
			"parallelstotal": 180,
			"position": 225,
			"color": "#003399",
			"parallels": {
					"dn": [40,0],
					"mn": [10,40],
					"sn": [50,50],
					"an": [80,100]
					}
			},
	"sn": {
			"collection": "sn",
			"name": "Saṃyutta",
			"parallelstotal": 240,
			"position": 430,
			"color": "#009933",
			"parallels": {
					"dn": [100,0],
					"mn": [50,100],
					"sn": [10,150],
					"an": [80,160]
					}
			},
	"an": {
			"collection": "an",
			"name": "Aṅguttara",
			"parallelstotal": 220,
			"position": 695,
			"color": "#9900cc",
			"parallels": {
					"dn": [50,0],
					"mn": [80,50],
					"sn": [80,130],
					"an": [10,210]
					}
			}
}
