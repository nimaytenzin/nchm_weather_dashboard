<template>
  <div class="w-full flex justify-center h-full overflow-y-scroll">
    <div class="w-11/12 h-full">
      <div class="w-full">
        <div class="w-full bg-white p-6 rounded shadow-lg">
          <div class="w-full">
            <div>
              <p class="text-center font-semibold">འཆར་སྣང་དང་དམིགས་གཏད།</p>
              <p class="text-center font-semibold">Vision & Mission</p>
              <div class="my-4">
                <p>Vision: {{ aboutNchm.vision }}</p>
                <p>Vision Dzongkha: {{ aboutNchm.visionDzo }}</p>
                <p>Mission: {{ aboutNchm.mission }}</p>
                <p>Mission Dzongkha: {{ aboutNchm.missionDzo }}</p>
              </div>
            </div>

            <div>
              <p class="text-center font-semibold">
                རྒྱལ་ཡོངས་ཆུ་དཔྱད་དང་གནམ་གཤིས་རིག་པའི་ལྟེ་བའི་སྐོར།
              </p>
              <p class="text-center font-semibold">About NCHM</p>
              <textarea
                class="w-full"
                cols="30"
                rows="10"
                v-model="aboutNchm.about"
              ></textarea>
              <textarea
                class="w-full"
                cols="30"
                rows="10"
                v-model="aboutNchm.aboutDzo"
              ></textarea>
            </div>
          </div>
          <div class="w-full"></div>

          <div>
            <p class="text-center font-semibold">འབྲེལ་བ་འཐབ་ས།</p>
            <p class="text-center font-semibold">Contact Us</p>
            <p>Adress: {{ aboutNchm.address }}</p>
            <p>Contact: {{ aboutNchm.tel }}</p>
            <p>Website: {{ aboutNchm.website }}</p>
            <p>tollFree: {{ aboutNchm.tollFree }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    aboutNchm: {
      about: `The National Center for Hydrology and Meteorology (NCHM) is an autonomous scientific and technical organization of the Royal Government of Bhutan responsible for understanding the behaviours of atmosphere, its interaction with cryosphere and water bodies, the weather and climate and distribution of country’s water resources. It is the nodal agency responsible for generation of information and delivery of products and services on weather, climate, cryosphere and water resources in Bhutan. The Centre was established in January 2016 as per the recommendation of the Organization Development (OD) exercises carried out by the Royal Civil Service Commission (RCSC) in August 2014 to provide scientific and technical information and services related to weather, climate, cryosphere, meteorology, hydrology and water resources for line agencies and public, The recommendation for the creation of National Center of hydro-met by reorganizing the erstwhile the Department of Hydro-met Services (DHMS) under the Ministry of Economic Affairs was approval by the Cabinet during its 92nd Lhyengye Zhungtsog (LZ) Meeting held on 11th December 2015. The Center was formally delinked from the Ministry of Economic Affairs vide letter no. MoEA/SEC/HRD/2017/06 dated January 24, 2017 with effect from 1 February 2017.The Center is the designated national focal point of international scientific organization like World Meteorological Organization (WMO) and International Panel for Climate Change (IPCC).`,
      aboutDzo: `རྒྱལ་ཡོངས་ཆུ་དཔྱད་དང་གནམ་གཤིས་རིག་པའི་ལྟེ་བ་འདི་ འབྲུག་རྒྱལ་གཞུང་གི་དབང་འཛིན་ཅན་གྱི་མཚན་རིག་དང་འཕྲུལ་རིག་ལས་སྡེ་ཅིག་ཨིནམ་དང་ དེ་ལུ་ རླུང་ཁམས་ཀྱི་འགྱུར་གྲོས་གནས་སྟངས་ཧ་གོ་ནི་དང་ དེ་གིས་ འཁྱེག་རོམ་དང་ཆུ་ཕུང་གཅིག་ཁར་ ཕན་ཚུན་འབྲེལ་བ་འཐབ་ཐངས་དང་ གནམ་གཤིས་དང་བསིལ་དྲོད་ དེ་ལས་ རྒྱལ་ཁབ་ཀྱི་ཆུའི་ཐོན་སྐྱེད་ཚུ་ བཀྲམ་སྤེལ་འབད་ནིའི་ལཱ་འགན་ཡོད། འབྲུག་རྒྱལ་ཁབ་ནང་ གནམ་གཤིས་དང་ བསིལ་དྲོད་ འཁྱེག་ཁམས་དང་ ཆུའི་ཐོན་སྐྱེད་འབྲེལ་བའི་ཞབས་ཏོག་དང་ བརྡ་དོན་བཏོན་ནི་ དེ་ལས་ ཐོན་དངོས་སྐྱེལ་སྤྲོད་འབད་ནིའི་འགན་ཁུར་ཡོད་མི་ ལས་སྡེ་ལྟེ་བ་ཅིག་ཨིན། ལྟེ་བ་འདི་ཡང་ སྤྱི་ལོ་ ༢༠༡༤ ལུ་གཞི་བཙུགས་འབད་ཡོདཔ་དང་ དེ་ཡང་ སྤྱི་ལོ་ ༢༠༡༤ ལོར་ རྒྱལ་གཞུང་ཞི་གཡོག་ལྷན་ཚོགས་ཀྱིས་ ལས་སྡེ་གོང་འཕེལ་གྱི་དབྱེ་ཞིབ་ཅིག་འབད་མིའི་རྒྱབ་སྣོན་དང་འཁྲིལ་ཏེ་ འབྲེལ་ཡོད་ལས་སྡེ་དང་ མི་མང་ལུ་ གནམ་གཤིས་དང་ བསིལ་དྲོད་ འཁྱེག་ཁམས་ གནམ་གཤིས་རིག་པ་ ཆུ་དཔྱད་རིག་པ་ དེ་ལས་ ཆུའི་ཐོན་སྐྱེད་འབྲེལ་བའི་ མཚན་རིག་དང་ འཕྲུལ་རིག་བརྡ་དོན་དང་ཞབས་ཏོག་ཚུ་བྱིན་ཐབས་ལུ་དམིགས་ཏེ་གཞི་བཙུགས་འབད་ཡོདཔ་ཨིན་པས། ཧེ་མ བསྟན་རྒྱས་ལྷན་ཁག་འོག་ལུ་ཡོད་པའི་ ཆུ་དཔྱད་དང་གནམ་གཤིས་རིག་པའི་ ལས་ཁུངས་འདི་ ལེགས་འགྱུར་འབད་ཐོག་ལས་ རྒྱལ་ཡོངས་ཆུ་དཔྱད་དང་གནམ་གཤིས་རིག་པའི་ལྟེ་བ་གཞི་བཙུགས་འབད་དགོ་པའི་རྒྱབ་སྣོན་འདི་ སྤྱི་ལོ་ ༢༠༡༥ ཟླ་ ༡༢ པའི་ཚེས་ ༡༡ ལུ་ ལྷན་རྒྱས་གཞུང་ཚོགས་ཀྱི་ཞལ་འཛོམས་ཐེངས་ ༩༢ པའིནང་ཆ་འཇོག་གནང་ནུག། ལྟེ་བ་འདི་ བསྟན་རྒྱས་ལྷན་ཁག་གི་ ཡིག་ཨང་ བསྟན་ལྷན/དྲུང་ཆེན/མི་སྟོབས/༢༠༡༧/༠༦ སྤྱི་ཚེས་ ༢༤/༡/༢༠༡༧ ཅན་མ་དང་འཁྲིལ་ སྤྱི་ལོ་ ༢༠༡༧ ཟླ་ ༢ པའི་ཚེས་ ༡ ལས་ འབྲེལ་ཤོད་འབད་ནུག ལྟེ་བ་འདི་ འཛམ་གླིང་གནམ་གཤིས་རིག་པའི་སྤྱི་ཚོགས་དང་ རྒྱལ་སྤྱི་གནམ་གཤིས་འགྱུར་གྲོས་ཀྱི་གྲོས་ཚོགས་ལུ་ རྒྱལ་ཡོངས་ཀྱི་ལྟེ་གནས་ཨིན།`,
      vision:
        "Center of excellence in Hydrology, Meteorology and Cryosphere Science and Services",
      visionDzo:
        "ཆུ་དཔྱད་དང་ གནམ་གཤིས་ འཁྱེག་ཁམས་རིག་པ་དང་ཞབས་ཏོག་ནང་ ཁྱད་རིག་ཅན་གྱི་ལྟེ་བ།",
      mission: `Monitoring and understanding of hydrology, weather, climate and cryosphere, for timely provision of information and services to protect lives and property and support national needs for ecologically balanced sustainable development.`,
      missionDzo:
        "ཚེ་སྲོག་དང་ རྒྱུ་ཆ་ཚུ་ཉེན་སྲུང་འབད་ནིའི་དོན་ལས་ དུས་མཐུན་བརྡ་དོན་དང་ཞབས་ཏོག་བྱིན་ནི་དང་ སྐྱེ་ལྡན་གནས་སྟངས་ ཚད་ སྙོམས་དང་ ཡུན་བརྟན་གོང་འཕེལ་གྱི་དོན་ལས་ རྒྱལ་ཡོངས་ཀྱི་དགོས་མཁོ་ཚུ་ལུ་ རྒྱབ་སྐྱོར་འབད་ནིའི་དོན་ལས་ ཆུ་དཔྱད་དང་ གནམ་གཤིས་ བསིལ་དྲོད་ འཁྱེག་ཁམས་གནས་སྟངས་ཧ་གོ་ནི་དང་ ལྟ་རྟོག་འབད་ནི།",
      website: "https://www.nchm.gov.bt/",
      tollFree: "1030",
      tel: "+975 02 33 5578/339673/+975 7745632",
      address: "S Doebum Lam",
    },
  }),
  created() {},
  methods: {},
};
</script>

<style></style>
