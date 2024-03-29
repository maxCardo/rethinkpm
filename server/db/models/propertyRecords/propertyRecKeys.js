


const propertyKeys = {
    SchoolDistrict: {
        1:"Allegheny Valley",
        2:"Avonworth",
        3:"Pine-Richland",
        4:"Baldwin Whitehall",
        5:"Bethel Park",
        6:"Brentwood Boro",
        7:"Carlynton",
        8:"Chartiers Valley",
        9:"Woodland Hills",
        10:"Clairton City",
        11:"Cornell",
        12:"Deer Lakes",
        13:"Duquesne City",
        14:"East Allegheny",
        16:"Elizabeth Forward",
        17:"Fox Chapel Area",
        18:"Gateway",
        20:"Hampton Township",
        21:"Highlands",
        22:"Keystone Oaks",
        23:"McKeesport Area",
        24:"Montour",
        25:"Moon Area",
        26:"Mt Lebanon",
        27:"North Allegheny",
        28:"North Hills",
        29:"Northgate",
        30:"Penn Hills Twp",
        31:"Plum Boro",
        32:"Quaker Valley",
        33:"Riverview",
        34:"Shaler Area",
        35:"South Allegheny",
        36:"South Fayette Twp",
        37:"South Park",
        38:"Steel Valley",
        39:"Sto-Rox",
        42:"Upper St Clair",
        43:"West Allegheny",
        44:"West Jefferson Hills",
        45:"West Mifflin Area",
        46:"Wilkinsburg Boro",
        47:"Pittsburgh",
        48:"Fort Cherry",
        49:"Penn-Trafford",
        50:"Norwin"
    },
    useCode: {
        10:"SINGLE FAMILY",
        20:"TWO FAMILY",
        30:"THREE FAMILY",
        40:"FOUR FAMILY",
        60:"TOWNHOUSE",
        70:"ROWHOUSE",
        401:"APART: 5-19 UNITS",
        402:"APART:20-39 UNITS",
        403:"APART:40+ UNITS",
        404:"RETL/APT'S OVER",
        431:"OFFICE/APARTMENTS OVER",
        557:"COMM APRTM CONDOS 5-19 UNITS",
        558:"COMM APRTM CONDOS 20-39 UNITS",
        559:"COMM APRTM CONDOS 40+ UNITS"
    },
    ownerType : {
        10:"REGULAR",
        11:"REGULAR-ETAL",
        12:"REGULAR-ETUX OR ET VIR",
        13:"REGULAR-ESTATE",
        16:"REGULAR-ETAL & ETUX",
        18:"REGULAR-UNFINISHED",
        20:"CORPORATION",
        21:"CORPORATION-RAILROAD",
        23:"CORPORATION-RIGHT-OF-WAY",
        28:"CORPORATION-UNFINISHED"
    },
    Area : {
        101 : "1st Ward  - PITTSBURGH",
        102 : "2nd Ward - PITTSBURGH",
        103 : "3rd Ward - PITTSBURGH",
        104 : "4th Ward - PITTSBURGH",
        105 : "5th Ward - PITTSBURGH",
        106 : "6th Ward - PITTSBURGH",
        107 : "7th Ward - PITTSBURGH",
        108 : "8th Ward - PITTSBURGH",
        109 : "9th Ward - PITTSBURGH",
        110 : "10th Ward - PITTSBURGH",
        111 : "11th Ward - PITTSBURGH",
        112 : "12th Ward - PITTSBURGH",
        113 : "13th Ward - PITTSBURGH",
        114 : "14th Ward - PITTSBURGH",
        115 : "15th Ward - PITTSBURGH",
        116 : "16th Ward - PITTSBURGH",
        117 : "17th Ward - PITTSBURGH",
        118 : "18th Ward - PITTSBURGH",
        119 : "19th Ward - PITTSBURGH",
        120 : "20th Ward - PITTSBURGH",
        121 : "21st Ward - PITTSBURGH",
        122 : "22nd Ward - PITTSBURGH",
        123 : "23rd Ward - PITTSBURGH",
        124 : "24th Ward - PITTSBURGH",
        125 : "25th Ward - PITTSBURGH",
        126 : "26th Ward - PITTSBURGH",
        127 : "27th Ward - PITTSBURGH",
        128 : "28th Ward - PITTSBURGH",
        129 : "29th Ward - PITTSBURGH",
        130 : "30th Ward - PITTSBURGH",
        131 : "31st Ward - PITTSBURGH",
        132 : "32nd Ward - PITTSBURGH",
        201 : "1st Ward - CLAIRTON",
        202 : "2nd Ward - CLAIRTON",
        301 : "1st Ward  - DUQUESNE",
        302 : "2nd Ward  - DUQUESNE",
        303 : "3rd Ward  - DUQUESNE",
        401 : "1st Ward  - McKEESPORT",
        402 : "2nd Ward - McKEESPORT  ",
        403 : "3rd Ward - McKEESPORT",
        404 : "4th Ward - McKEESPORT ",
        405 : "5th Ward  - McKEESPORT",
        406 : "6th Ward  - McKEESPORT",
        407 : "7th Ward  - McKEESPORT",
        408 : "8th Ward  - McKEESPORT",
        409 : "9th Ward  -  McKEESPORT",
        410 : "10th Ward -  McKEESPORT",
        411 : "11th Ward  - McKEESPORT",
        412 : "12th Ward  - McKEESPORT",
        801 : "Aspinwall  ",
        802 : "Avalon  ",
        803 : "Bellevue  ",
        804 : "Ben Avon  ",
        805 : "Ben Avon Heights  ",
        806 : "Blawnox  ",
        807 : "Brackenridge  ",
        808 : "Braddock  ",
        809 : "Bradford Woods",
        810 : "Brentwood",
        811 : "Bridgeville  ",
        812 : "Carnegie  ",
        813 : "Castle Shannon  ",
        814 : "Chalfant  ",
        815 : "Cheswick  ",
        816 : "Churchill  ",
        817 : "Coraopolis  ",
        818 : "Crafton  ",
        819 : "Dormont  ",
        820 : "Dravosburg  ",
        821 : "East McKeesport  ",
        822 : "East Pittsburgh  ",
        823 : "Edgewood  ",
        824 : "Edgeworth  ",
        825 : "Elizabeth Boro  ",
        826 : "Emsworth  ",
        827 : "Etna  ",
        828 : "Forest Hills  ",
        829 : "Glassport  ",
        830 : "Glenfield  ",
        831 : "Greentree  ",
        832 : "Haysville  ",
        833 : "Heidelberg  ",
        834 : "Homestead  ",
        835 : "Ingram  ",
        836 : "Leetsdale  ",
        837 : "Liberty  ",
        838 : "Millvale  ",
        839 : "Mt. Oliver  ",
        840 : "Munhall  ",
        841 : "McDonald  ",
        842 : "McKees Rocks  ",
        843 : "North Braddock  ",
        844 : "Oakdale  ",
        845 : "Oakmont  ",
        846 : "Glen Osborne",
        847 : "Pitcairn  ",
        848 : "Port Vue  ",
        849 : "Rankin  ",
        850 : "Rosslyn Farms  ",
        851 : "Sewickley  ",
        852 : "Sharpsburg  ",
        853 : "Springdale Boro  ",
        854 : "Swissvale  ",
        855 : "Tarentum  ",
        856 : "Thornburg  ",
        857 : "Trafford  ",
        858 : "Turtle Creek  ",
        859 : "Verona  ",
        860 : "Versailles  ",
        861 : "Wall  ",
        862 : "West Elizabeth  ",
        863 : "West Homestead  ",
        864 : "West View  ",
        865 : "Whitaker  ",
        866 : "Wilkinsburg  ",
        867 : "Wilmerding  ",
        868 : "Fox Chapel  ",
        869 : "Sewickley Heights  ",
        870 : "West Mifflin  ",
        871 : "Pennsbury Village  ",
        872 : "Braddock Hills  ",
        873 : "Pleasant Hills  ",
        874 : "Whitehall  ",
        875 : "White Oak  ",
        876 : "Bethel Park  ",
        877 : "Baldwin Boro  ",
        878 : "Jefferson Hills",
        879 : "Monroeville  ",
        880 : "Plum  ",
        881 : "Lincoln  ",
        882 : "Sewickley Hills  ",
        883 : "Bell Acres  ",
        884 : "Franklin Park ",
        901 : "Aleppo  ",
        902 : "Baldwin Twp  ",
        905 : "Collier  ",
        906 : "Crescent  ",
        907 : "East Deer  ",
        908 : "Elizabeth Twp  ",
        909 : "Fawn  ",
        910 : "Findlay  ",
        911 : "Forward  ",
        913 : "Frazer  ",
        914 : "Hampton  ",
        915 : "Harmar  ",
        916 : "Harrison  ",
        917 : "Indiana  ",
        919 : "Kennedy  ",
        920 : "Kilbuck  ",
        921 : "Leet  ",
        923 : "Marshall  ",
        925 : "Moon  ",
        926 : "Mt.Lebanon  ",
        927 : "McCandless  ",
        928 : "Neville  ",
        929 : "North Fayette  ",
        930 : "North Versailles  ",
        931 : "O''Hara  ",
        932 : "Ohio  ",
        934 : "Penn Hills  ",
        935 : "Pine  ",
        937 : "Reserve  ",
        938 : "Richland  ",
        939 : "Robinson  ",
        940 : "Ross  ",
        941 : "Scott  ",
        944 : "Shaler  ",
        945 : "South Park  ",
        946 : "South Fayette  ",
        947 : "South Versailles  ",
        948 : "Springdale Twp  ",
        949 : "Stowe  ",
        950 : "Upper St. Clair  ",
        952 : "West Deer  ",
        953 : "Wilkins "
    }
}

module.exports = propertyKeys