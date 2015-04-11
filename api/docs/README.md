# API DOCUMENTATION

<table>
  <tr>
    <td>VERB</td>
    <td>ROUTE</td>
    <td>PARAMETERS</td>
    <td>RESPONSE</td>
    <td>Example</td>
  </tr>
  <tr>
    <td>get</td>
    <td>/answers</td>
    <td>query: {email}</td>
    <td>[Answer]</td>
    <td>localhost:9292/answers?email="hello”</td>
  </tr>
  <tr>
    <td>post</td>
    <td>/answer</td>
    <td>body:[Answer]</td>
    <td>200</td>
    <td>localhost:9292/answer</td>
  </tr>
  <tr>
    <td>get</td>
    <td>/question/1/options</td>
    <td>none</td>
    <td>[Option]</td>
    <td>localhost:9292/question/1/options</td>
  </tr>
  <tr>
    <td>get</td>
    <td>/question/2/options</td>
    <td>query: {answer1}</td>
    <td>[Option]</td>
    <td>localhost:9292/question/2/options?answer1=Large</td>
  </tr>
  <tr>
    <td>get</td>
    <td>/question/3/options</td>
    <td>query: {answer1}
query: {answer2}</td>
    <td>[Option]</td>
    <td>localhost:9292/question/3/options?answer1=Large&answer2=Space%20and%20Science</td>
  </tr>
  <tr>
    <td>get</td>
    <td>/data/1</td>
    <td>query: {answer1}
</td>
    <td>[QuestionOneData]</td>
    <td>localhost:9292/data/1?answer1=Large</td>
  </tr>
  <tr>
    <td>get</td>
    <td>data/2</td>
    <td>query: {answer1}
query: {answer2}</td>
    <td>[QuestionTwoData]</td>
    <td>localhost:9292/data/2?answer1=Large&answer2=Military and Intelligence%20</td>
  </tr>
  <tr>
    <td>get</td>
    <td>data/3</td>
    <td>query: {answer1}
query: {answer2}
query: {answer3}</td>
    <td>[QuestionThreeData]</td>
    <td>localhst:9292/data/3?answer1=large&answer2=Military and Intelligence&answer3=Manufacturing</td>
  </tr>
  <tr>
    <td>get</td>
    <td>data/solicitations</td>
    <td>query: {answer1}
query: {answer2}
query: {answer3}</td>
    <td>[FetchTableData]</td>
    <td>localhost:9292/data/fetch?answer1=large&answer2=Military and Intelligence&answer3=Manufacturing</td>
  </tr>
  <tr>
    <td>get</td>
    <td>data/total</td>
    <td></td>
    <td>total number</td>
    <td>localhost:9292/data/total</td>
  </tr>
</table>

## Answer Model

<pre>
{
  questionId: String
  selectedOption: String
  email: String
}
</pre>

Example:

get /answers/user

<pre>
[
  {
    questionId: 1
    selectedOption: "bob"
    email: "email"   
  }

  {
    questionId: 2
    selectedOption: "23"
    email: "email"
  }
]
</pre>

## Option Model

<pre>
{
  optionId: String
  text: String
}
</pre>

example

get/question/1/options

<pre>
[
  {
     optionId: 1
     text: "22"
  }
 {
     optionId: 2
     text: "25"
  }

]
</pre>

## QuestionOneData

Summary:

This json contains data to display two visualizations. The first visual will display the total # of opportunities filtered by business size. The second visual will be a pie chart of total opportunities by Market. A Market is defined in the appendix.

<pre>
{
  questionId: String
  total:  Integer
  selectedBusinessSize:String
  marketData:
    {
      (market name: String) : (number of opportunities: Integer)
    }
}
</pre>

Ex:

```json
{"questionId":"1","total":3021,"selectedBusinessSize":"enterprise","marketData":{"Military and Intelligence ":2530,"Space and Science":34,"Finance and Insurance":25,"Civil (Dept)":230,"Civil (Other)":67,"Law Enforcement and Transit":93,"International":40,"Other":2}}
```

## QuestionTwoData

Summary:

This json provides data for two visualizations. The first visual will display the total # of opportunities filtered by business size and selected market interest. The second visualization will be a radar chart to display an area density representation of opportunities by market.

<pre>
{
  questionId: String
  total: Integer
  selectedBusinessSize: String
  selectedMarket: String
  agencyData:
    {
      (agency name: String) : (number of opportunities: Integer)
    }
}
</pre>

Ex:

```json
{"questionId":"2","total":2530,"selectedBusinessSize":"enterprise","selectedMarket":"Military and Intelligence ","agencyData":{"Department of the Army":328,"Other Defense Agencies":39,"Department of the Navy":1009,"Department of the Air Force":228,"Department of Veterans Affairs":94,"Office of the Director of National Intelligence":1,"Defense Information Systems Agency":31,"Defense Logistics Agency":794,"Defense Contract Management Agency":6}}
```

## QuestionThreeData

Summary:

This json provides data for two visualizations. The first visual will display the total # of opportunities filtered by business size and capability interest. The second visualization will be a radar chart to display an area density representation of opportunities by capability overlayed on top of a radar chart displaying opportunities by market.

<pre>
{
  questionId: String,
  totalOpportunities: Integer,
  selectedBusinessSize: String,
  selectedMarketName: String,
  selectedCapabilityName: String,
    {
      (agency name: String) : (number of opportunities: Integer)
    }
}
</pre>

Example:

```json
{"questionId":"3","total":1661,"selectedBusinessSize":"large","selectedMarket":"Military and Intelligence","selectedCapability":"Manufacturing","agencyData":{"Department of the Army":190,"Other Defense Agencies":9,"Department of the Navy":230,"Department of the Air Force":187,"Department of Veterans Affairs":42,"Office of the Director of National Intelligence":0,"Defense Information Systems Agency":1,"Defense Logistics Agency":1002,"Defense Contract Management Agency":0}}
```

## FetchTableData

Summary:

This json provides data for for the table filtered by the answers for the 

<pre>
{
  selectedBusinessSize": large,**
  "selectedMarket": "Military and Intelligence",
  "selectedCapability": "Manufacturing",
  "results": [
    {
        "agency":"Defense Logistics Agency",
        "link": "https://www.fbo.gov/spg/DLA/J3/DSCP-I-BSM/SPE5EJ15T6561/listing.html",
        "location": "DLA Troop Support - Construction & Equipment - BSM",
        "naics": "326291",
        "naicsName": "Rubber Product Manufacturing for Mechanical Use ",
        "office": "DLA Acquisition Locations",
        "responseDate": "2015-04-09",
        "setAside": ****"N/A"****,**
        "solNumber": "SPE5EJ15T6561",
        "status": "Solicitation"
    }
  }  
</pre>

# Markets

- "Military and Intelligence"

- "Space and Science"

- "Finance and Insurance"

- "Civil (Dept)"

- "Civil (Other)"

- "Law Enforcement and Transit"

- "International"

- "Other"

