export default [ 

    /* computer science root */
    {
        "data": {
            "id": "CS",
            "url": "",
            "label": "Computer Science"
        }
    },

    /* computer architecture root */
    {
        "data": {
            "id": "CA",
            "url": "",
            "label": "Computer Architecture"
        }
    },
    {
        "data": { "id": "CS<-CA", "source": "CA", "target": "CS" }
    },

    {
        "data": {
            "id": "CODE",
            "url": "",
            "label": "CODE Petzold"
        }
    },
    {
        "data": { "id": "CA<-CODE", "source": "CODE", "target": "CA" }
    },

    {
        "data": {
            "id": "physicsAndElectroEngineer",
            "url": "",
            "label": "Physics & Eletro Engineering"
        }
    },
    {
        "data": { "id": "CA<-physicsAndElectroEngineer", "source": "physicsAndElectroEngineer", "target": "CA" }
    },

    {
        "data": {
            "id": "tetris",
            "url": "",
            "label": "From Nand To Tetris"
        }
    },
    {
        "data": { "id": "CA<-tetris", "source": "tetris", "target": "CA" }
    },


    /* operating system root */
    {
        "data": {
            "id": "OS",
            "url": "",
            "label": "Operating System"
        }
    },
    {
        "data": { "id": "CS<-OS", "source": "OS", "target": "CS" }
    },




    /* network root */
    {
        "data": {
            "id": "NW",
            "url": "",
            "label": "Network"
        }
    },
    {
        "data": { "id": "CS<-NW", "source": "NW", "target": "CS" }
    },


    {
        "data": {
            "id": "centosServer",
            "url": "",
            "label": "Centos7 Server"
        }
    },
    {
        "data": { "id": "NW<-centosServer", "source": "centosServer", "target": "NW" }
    },

    {
        "data": {
            "id": "networkbasics",
            "url": "",
            "label": "Network Basics"
        }
    },
    {
        "data": { "id": "NW<-networkbasics", "source": "networkbasics", "target": "NW" }
    },


    {
        "data": {
            "id": "hooni",
            "url": "",
            "label": "Hooni's Sysco Networking"
        }
    },
    {
        "data": { "id": "NW<-hooni", "source": "hooni", "target": "NW" }
    },

    {
        "data": {
            "id": "AWS",
            "url": "",
            "label": "AWS"
        }
    },
    {
        "data": { "id": "NW<-AWS", "source": "AWS", "target": "NW" }
    },



    /////////////////////////////////////////////////////////////////////////////////////////////////

    /* front end root */
    {
        "data": {
            "id": "FE",
            "url": "",
            "label": "Front End"
        }
    },


    //html
    {
        "data": {
            "id": "HTML",
            "url": "",
            "label": "HTML"
        }
    },
    {
        "data": { "id": "FE<-HTML", "source": "HTML", "target": "FE" }
    },

    {
        "data": {
            "id": "HTML5",
            "url": "",
            "label": "HTML5"
        }
    },
    {
        "data": { "id": "HTML<-HTML5", "source": "HTML5", "target": "HTML" }
    },


    //css
    {
        "data": {
            "id": "CSS",
            "url": "",
            "label": "CSS"
        }
    },
    {
        "data": { "id": "FE<-CSS", "source": "CSS", "target": "FE" }
    },

    {
        "data": {
            "id": "Flexbox",
            "url": "",
            "label": "Flexbox"
        }
    },
    {
        "data": { "id": "CSS<-Flexbox", "source": "Flexbox", "target": "CSS" }
    },

    {
        "data": {
            "id": "Grid",
            "url": "",
            "label": "Grid"
        }
    },
    {
        "data": { "id": "CSS<-Grid", "source": "Grid", "target": "CSS" }
    },


    //javascript
    {
        "data": {
            "id": "Javascript",
            "url": "",
            "label": "Javascript"
        }
    },
    {
        "data": { "id": "FE<-Javascript", "source": "Javascript", "target": "FE" }
    },

    {
        "data": {
            "id": "DOM",
            "url": "",
            "label": "DOM"
        }
    },
    {
        "data": { "id": "Javascript<-DOM", "source": "DOM", "target": "Javascript" }
    },

    {
        "data": {
            "id": "Json",
            "url": "",
            "label": "Json"
        }
    },
    {
        "data": { "id": "Javascript<-Json", "source": "Json", "target": "Javascript" }
    },

    {
        "data": {
            "id": "Ajax",
            "url": "",
            "label": "Ajax"
        }
    },
    {
        "data": { "id": "Javascript<-Ajax", "source": "Ajax", "target": "Javascript" }
    },

    {
        "data": {
            "id": "project",
            "url": "",
            "label": "project"
        }
    },
    {
        "data": { "id": "Javascript<-project", "source": "project", "target": "Javascript" }
    },

    {
        "data": {
            "id": "cytoscape",
            "url": "",
            "label": "cytoscape.js"
        }
    },
    {
        "data": { "id": "project<-cytoscape", "source": "cytoscape", "target": "project" }
    },

    {
        "data": {
            "id": "growthMindCharacter",
            "url": "",
            "label": "성장형 캐릭터"
        }
    },
    {
        "data": { "id": "project<-growthMindCharacter", "source": "growthMindCharacter", "target": "project" }
    },

    {
        "data": {
            "id": "Webpack",
            "url": "",
            "label": "Webpack"
        }
    },
    {
        "data": { "id": "Javascript<-Webpack", "source": "Webpack", "target": "Javascript" }
    },

    {
        "data": {
            "id": "babel",
            "url": "",
            "label": "babel"
        }
    },
    {
        "data": { "id": "Webpack<-babel", "source": "babel", "target": "Webpack" }
    },



    /////////////////////////////////////////////////////////////////////////////////////////////////

    /* back end root */
    {
        "data": {
            "id": "BE",
            "url": "",
            "label": "Back End"
        }
    },

    //java
    {
        "data": {
            "id": "Java",
            "url": "",
            "label": "Java"
        }
    },
    {
        "data": { "id": "BE<-Java", "source": "Java", "target": "BE" }
    },

    {
        "data": {
            "id": "OOP",
            "url": "",
            "label": "OOP"
        }
    },
    {
        "data": { "id": "Java<-OOP", "source": "OOP", "target": "Java" }
    },

    {
        "data": {
            "id": "JSP-Servlet",
            "url": "",
            "label": "JSP-Servlet"
        }
    },
    {
        "data": { "id": "Java<-JSP-Servlet", "source": "JSP-Servlet", "target": "Java" }
    },

    {
        "data": {
            "id": "Tomcat",
            "url": "",
            "label": "Tomcat"
        }
    },
    {
        "data": { "id": "Java<-Tomcat", "source": "Tomcat", "target": "Java" }
    },


    {
        "data": {
            "id": "Spring",
            "url": "",
            "label": "Spring"
        }
    },
    {
        "data": { "id": "Java<-Spring", "source": "Spring", "target": "Java" }
    },


    //design pattern
    {
        "data": {
            "id": "DesignPattern",
            "url": "",
            "label": "Design Pattern"
        }
    },
    {
        "data": { "id": "BE<-DesignPattern", "source": "DesignPattern", "target": "BE" }
    },

    {
        "data": {
            "id": "HeadFirst",
            "url": "",
            "label": "HeadFirst Design Pattern"
        }
    },
    {
        "data": { "id": "DesignPattern<-HeadFirst", "source": "HeadFirst", "target": "DesignPattern" }
    },


    //git
    {
        "data": {
            "id": "Git",
            "url": "",
            "label": "Git"
        }
    },
    {
        "data": { "id": "BE<-Git", "source": "Git", "target": "BE" }
    },


    {
        "data": {
            "id": "Regex",
            "url": "",
            "label": "Regex"
        }
    },
    {
        "data": { "id": "BE<-Regex", "source": "Regex", "target": "BE" }
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////

    /* database root */
    {
        "data": {
            "id": "DB",
            "url": "",
            "label": "Database"
        }
    },

    //relational database
    {
        "data": {
            "id": "RDB",
            "url": "",
            "label": "Relational Database"
        }
    },
    {
        "data": { "id": "DB<-RDB", "source": "RDB", "target": "DB" }
    },

    //persistent framework
    {
        "data": {
            "id": "PersistentFramework",
            "url": "",
            "label": "Persistent Framework"
        }
    },
    {
        "data": { "id": "DB<-PersistentFramework", "source": "PersistentFramework", "target": "DB" }
    },

    {
        "data": {
            "id": "JDBC",
            "url": "",
            "label": "JDBC"
        }
    },
    {
        "data": { "id": "PersistentFramework<-JDBC", "source": "JDBC", "target": "PersistentFramework" }
    },

    {
        "data": {
            "id": "Mybatis",
            "url": "",
            "label": "Mybatis"
        }
    },
    {
        "data": { "id": "PersistentFramework<-Mybatis", "source": "Mybatis", "target": "PersistentFramework" }
    },


    /////////////////////////////////////////////////////////////////////////////////////////////////

    /* math root */
    {
        "data": {
            "id": "MATH",
            "url": "",
            "label": "Math"
        }
    },

    {
        "data": {
            "id": "Datastructure",
            "url": "",
            "label": "Datastructure"
        }
    },
    {
        "data": { "id": "MATH<-Datastructure", "source": "Datastructure", "target": "MATH" }
    },

    {
        "data": {
            "id": "Algorithm",
            "url": "",
            "label": "Algorithm"
        }
    },
    {
        "data": { "id": "MATH<-Algorithm", "source": "Algorithm", "target": "MATH" }
    },
]