public with sharing class zipCodeCallout {

    @AuraEnabled
    public static WrapperZipInfo showZipCodeDetails(String zipCode, String country){
        WrapperZipInfo listWrapZipReturnedInfo = new WrapperZipInfo();
        Http http = new Http();
        HttpRequest request = new HttpRequest();
         
        // Provide the Named Credentials
        request.setEndpoint('callout:zipCode/' + country + '/' + zipCode);
        request.setMethod('GET');        
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            String resBody = response.getbody();
            String jsonStr = resBody.replaceAll( '\\s+', ''); //Before parsing the JSON string, I have removed the space.
            listWrapZipReturnedInfo =(WrapperZipInfo)json.deserialize(jsonStr,WrapperZipInfo.class);
        }
        return listWrapZipReturnedInfo;
    }
public class WrapperZipInfo{
        @auraEnabled
        public String countryabbreviation{get;set;}
        @auraEnabled
  public String country{get;set;}
        @auraEnabled
  public list<places> places{get;set;}
  
        
    }
    public class places{
        @auraEnabled
        public String longitude{get;set;}
        @auraEnabled
        public String state{get;set;}
        @auraEnabled
        public String placename{get;set;}
        @auraEnabled
        public String stateabbreviation{get;set;}
        @auraEnabled
        public String latitude{get;set;}
    }

}