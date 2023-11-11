import {Scrubber} from "@mbostock/scrubber"
d3 = require('d3@7')
nytdata = FileAttachment("nyt-metadata-sample.csv")
metadata = d3.csvParse(await nytdata.text())
