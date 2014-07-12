# coding: utf-8
# Seed add you the ability to populate your db.
# We provide you a basic shell for interaction with the end user.
# So try some code like below:
#
#   name = shell.ask("What's your name?")
#   shell.say name
#
countries = ["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas, The","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo, Dem. Rep.","Congo, Rep.","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt, Arab Rep.","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Faeroe Islands","Fiji","Finland","France","French Polynesia","Gabon","Gambia, The","Georgia","Germany","Ghana","Greece","Greenland","Grenada","Guam","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong SAR, China","Hungary","Iceland","India","Indonesia","Iran, Islamic Rep.","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Dem. Rep.","Korea, Rep.","Kosovo","Kuwait","Kyrgyz Republic","Lao PDR","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao SAR, China","Macedonia, FYR","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia, Fed. Sts.","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Romania","Russian Federation","Rwanda","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten (Dutch part)","Slovak Republic","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","St. Kitts and Nevis","St. Lucia","St. Martin (French part)","St. Vincent and the Grenadines","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Venezuela, RB","Vietnam","Virgin Islands (U.S.)","West Bank and Gaza","Yemen, Rep.","Zambia","Zimbabwe"]
countries.each do |c|
  Country.create :name=>c
end

cats = "Nuclear$Mineral Ores and Building Materials Extraction$Waste Management$Biomass and Land Conflicts (Forests, Agriculture and Livestock Management)$Fossil Fuels and Climate Justice/Energy$Water Management$Infrastructure and Built Environment$Tourism Recreation$Biodiversity conservation conflicts$Industrial and Utilities conflicts$Other"
categories = cats.split('$')

categories.each do |c|
  Category.create :name=>c
end

typs = "Uranium extraction$Nuclear power plants$Nuclear waste storage#Mineral ore exploration$Mineral processing$Tailings from mines$Building materials extraction (quarries, sand, gravel)#Ship-breaking yards$Waste privatisation conflicts / waste-picker access to waste$Incinerators$Landfills, toxic waste treatment, uncontrolled dump sites#Land acquisition conflicts$Plantation conflicts (incl. Pulp$Logging and non timber extraction$Deforestation$Agro-toxics$GMOs$Agro-fuels and biomass energy plants$E-waste and other waste import zones$Aquaculture and fisheries$Intensive food production (monoculture and livestock)#Oil and gas exploration and extraction$Shale gas fracking$Gas flaring$Oil and gas refining$Coal extraction and processing$Climate change related conflicts (glaciers and small islands)$REDD/CDM$Windmills$Mega-project solar plants$Geothermal energy installations$Thermal power plants#Water access rights and entitlements$Desalination$Interbasin water transfers/transboundary water conflicts$Dams and water distribution conflicts$Water treatment and access to sanitation (access to sewage)$Transport infrastructure networks (roads, railways, hydroways, canals and pipelines)#Ports and airport projects$Pollution related to transport (spills, dust, emissions)$Urban development conflicts#Tourism facilities (ski resorts, hotels, marinas)$Establishment of reserves/national parks#Wetlands and coastal zone management$Biopiracy and bio-prospection$Invasive species#Manufacturing activities$Metal refineries$Chemical industries$Other industries$Military installations#Other"
typs.split('#').each_with_index do |t,i|
  cat = Category.find i+1
  t.split('$').each do |tt|
    Type.create :name=>tt, :category=>cat
  end
end

prod = "Aluminum/Bauxite$Asbestos$Asphalt$Carbon offsets$Cellulose$Charcoal$Coal$Coffee$Copper$Corn/Maize$Cotton$Crude oil$Cut flowers$Diamonds$Electricity$Ethanol$Eucalyptus$Fish$Fruits and Vegetables$Gold$Iron ore$Jatropha$Land$Lead$Lithium$Live Animals$Manufactured Products$Meat$Natural Gas$Palm oil$Pine$Rare metals$Recycled Metals$Rice$Rubber$Sand, gravel$Shrimps$Silver$Soybeans$Steel$Sugar$Uranium$Wheat$Zinc$Water$Biological resources$Domestic municipal waste$E-waste$Industrial waste$Chemical products$Pesticides$Titanium ores$Timber$Tourism services$Cement$Ecosystem Services$Other"
products = prod.split('$')

products.each do |p|
  Product.create :name=>p
end

mobg = "Artisanal miners$Farmers$Fishermen$Indigenous groups or traditional communities$Industrial workers$Informal workers$International ejos$Local ejos$Landless peasants$Local government/political parties$Neighbours/citizens/communities$Pastoralists$Social movements$Trade unions$Wastepickers, recyclers$Women$Ethnically/racially discriminated groups$Recreational users$Local scientists/professionals$Religious groups$Other"
mob_groups = mobg.split('$')

mob_groups.each do |m|
  MobilizingGroup.create :name=>m
end

mobf = "Artistic and creative actions (eg guerilla theatre, murals)$Blockades$Boycotts of official procedures/non-participation in official processes$Community-based participative research (popular epidemiology studies, etc..)$Creation of alternative reports/knowledge$Development of a network/collective action$Development of alternative proposals$Involvement of national and international NGOs$Land occupation$Lawsuits, court cases, judicial activism$Media based activism/alternative media$Objections to the EIA$Official complaint letters and petitions$Public campaigns$Referendum other local consultations$Sabotage$Shareholder/financial activism.$Street protest/marches$Property damage/arson$Strikes$Threats to use arms$Occupation of buildings/public spaces$Hunger strikes and self immolation$Arguments for the rights of mother nature$Appeals/recourse to economic valuation of the environment$Boycotts of companies-products$Refusal of compensation$Other"
mob_forms = mobf.split('$')

mob_forms.each do |m|
  MobilizingForm.create :name=>m
end

impe = "Air pollution$Biodiversity loss (wildlife, agro-diversity)$Desertification/Drought$Fires$Floods (river, coastal, mudflow)$Food insecurity (crop damage)$Genetic contamination$Global warming$Loss of landscape/aesthetic degradation$Noise pollution$Soil contamination$Soil erosion$Waste overflow$Oil spills$Deforestation and loss of vegetation cover$Surface water pollution / Decreasing water (physico-chemical, biological) quality$Groundwater pollution or depletion$Large-scale disturbance of hydro and geological systems$Reduced ecological / hydrological connectivity$Mine tailing spills$Other Environmental impacts"
env_impacts = impe.split('$')

env_impacts.each do |i|
  EnvImpact.create :name=>i
end

imph = "Accidents$Exposure to unknown or uncertain complex risks (radiation, etc…)$Malnutrition$Mental problems including stress, depression and suicide$Violence related health impacts (homicides, rape, etc..) $Health problems related to alcoholism, prostitution$Occupational disease and accidents$Infectious diseases$Deaths$Other environmental related diseases$Other Health impacts"
hlt_impacts = imph.split('$')

hlt_impacts.each do |i|
  HltImpact.create :name=>i
end

imps = "Increase in Corruption/Co-optation of different actors$Displacement$Increase in violence and crime$Lack of work security, labour absenteeism, firings, unemployment$Loss of livelihood$Loss of traditional knowledge/practices/cultures$Militarization and increased police presence$Social problems (alcoholism, prostitution, etc..)$Specific impacts on women$Violations of human rights$Land dispossession$Loss of landscape/sense of place$Other socio-economic impacts"
sec_impacts = imps.split('$')

sec_impacts.each do |i|
  SecImpact.create :name=>i
end

projs = "Unknown$Proposed (exploration phase)$Planned (decision to go ahead eg EIA undertaken, etc)$Under construction$In operation$Stopped"
proj_stats = projs.split('$')

proj_stats.each do |p|
  ProjectStatus.create :name=> p
end

cone = "Compensation$Corruption$Criminalization of activists$Deaths$Environmental improvements, rehabilitation/restoration of area$Institutional changes$Land demarcation$Court decision (victory for environmental justice)$Court decision (failure for environmental justice)$Court decision (undecided)$Migration/displacement$Negotiated alternative solution$New legislation$Repression$Strengthening of participation$Technical solutions to improve resource supply/quality/distribution$Under negotiation$Violent targeting of activists$Fostering a culture of peace$Application of existing regulations$New Environmental Impact Assessment/Study$Moratoria$Project cancelled$Withdrawal of company/investment$Project temporarily suspended$Other"
conflict_evts = cone.split('$')

conflict_evts.each do |c|
  ConflictEvent.create :name=>c
end

stats = [ "UNKNOWN","LATENT (no visible organising at the moment)","LOW (some local organising)","MEDIUM (street protests, visible mobilization)","HIGH (widespread, mass mobilization, violence, arrests, etc...)"]

stats.each do |s|
  Status.create :name=>s
end

reacs = [ "UNKNOWN","LATENT (no visible resistance)","PREVENTIVE resistance (precautionary phase)","In REACTION to the implementation (during construction or operation)","Mobilization for reparations once impacts have been felt"]

reacs.each do |r|
  Reaction.create :name=>r
end

email     = 'editor@ejolt.org'
amail     = 'admin@ejolt.org'
password  = 'c0nfl!ct'

shell.say ""

account = Account.create(:email => email, :name => "Editor", :surname => password, :password => password, :password_confirmation => password, :role => "editor")
account = Account.create(:email => amail, :name => "Admin", :surname => password, :password => password, :password_confirmation => password, :role => "admin")

if account.valid?
  shell.say "================================================================="
  shell.say "Account has been successfully created, now you can login with:"
  shell.say "================================================================="
  shell.say "   email: #{email}"
  shell.say "   password: #{password}"
  shell.say "================================================================="
else
  shell.say "Sorry but something went wrong!"
  shell.say ""
  account.errors.full_messages.each { |m| shell.say "   - #{m}" }
end

shell.say ""
