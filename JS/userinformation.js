function addUserInformation() {


    let basePath = "";


    if (window.location.pathname.includes("/Projects/")) {

        basePath = "../../Config/userinformation.txt";

    } 
    else if (window.location.pathname.includes("/HTML/")) {

        basePath = "../Config/userinformation.txt";

    } 
    else {

        basePath = "Config/userinformation.txt";

    }



    fetch(basePath)

        .then(response => response.text())

        .then(data => {


            const lines = data
                .split("\n")
                .map(line => line.trim());



            const [
                profilePicUrl,
                profileName,
                profileRole,
                location,
                ...socials
            ] = lines;



            const container = document.querySelector(".top-container");


            if (!container) {
                return;
            }



            // Prevent duplicate creation

            if (document.querySelector(".user-info-panel")) {

                return;

            }



            const fragment = document.createDocumentFragment();



            const userInfoPanel = document.createElement("div");

            userInfoPanel.className = "user-info-panel";




            // Profile picture

            const img = document.createElement("img");

            img.src = profilePicUrl;

            img.alt = "Profile Picture";

            img.className = "profile-pic";

            userInfoPanel.appendChild(img);




            // Name

            const userNameLink = document.createElement("a");

            userNameLink.href = "index.html";

            userNameLink.className = "user-name-link";



            const userName = document.createElement("h1");

            userName.className = "user-name";

            userName.textContent = profileName;



            userNameLink.appendChild(userName);

            userInfoPanel.appendChild(userNameLink);




            // Role

            const userRole = document.createElement("h2");

            userRole.textContent = profileRole;

            userInfoPanel.appendChild(userRole);




            // Location

            const locationContainer = document.createElement("div");

            locationContainer.className = "user-location-container";



            const locationIcon = document.createElement("span");

            locationIcon.className = "material-symbols-outlined";

            locationIcon.textContent = "near_me";



            const userLocation = document.createElement("h2");

            userLocation.textContent = location;



            locationContainer.appendChild(locationIcon);

            locationContainer.appendChild(userLocation);



            userInfoPanel.appendChild(locationContainer);





            // Social icons

            const socialIcons = document.createElement("div");

            socialIcons.className = "social-icons";




            const socialIconMap = {

                "x.com": "fa-brands fa-x-twitter",
                "facebook.com": "fa-brands fa-square-facebook",
                "discord.com": "fa-brands fa-discord",
                "discord.gg": "fa-brands fa-discord",
                "instagram.com": "fa-brands fa-instagram",
                "youtube.com": "fa-brands fa-youtube",
                "linkedin.com": "fab fa-linkedin",
                "artstation.com": "fa-brands fa-artstation",
                "github.com": "fab fa-github",
                "twitch.tv": "fab fa-twitch",
                "email": "fas fa-envelope"

            };




            socials.forEach(social => {


                if (!social) {
                    return;
                }


                let type = Object.keys(socialIconMap)
                    .find(key => social.includes(key));



                let url = social;



                if (!type) {

                    type = "email";

                    url = "mailto:" + social;

                }




                const a = document.createElement("a");

                a.href = url;



                if (!url.startsWith("mailto:")) {

                    a.target = "_blank";

                }



                const icon = document.createElement("i");

                icon.className = socialIconMap[type];



                a.appendChild(icon);

                socialIcons.appendChild(a);



            });



            userInfoPanel.appendChild(socialIcons);



            fragment.appendChild(userInfoPanel);



            // Keep original template order

            container.insertBefore(
                fragment,
                container.querySelector(".navigation-buttons")
            );


        })

        .catch(error => console.error(
            "Error loading user information:",
            error
        ));

}




document.addEventListener(
    "DOMContentLoaded",
    addUserInformation
);
