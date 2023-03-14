import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faMedium, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
	{
		icon: faEnvelope,
		url: "mailto: hello@example.com",
	},
  	{
    	icon: faGithub,
    	url: "https://github.com",
  	},
  	{
    	icon: faLinkedin,
    	url: "https://www.linkedin.com",
  	},
  	{
    	icon: faMedium,
    	url: "https://medium.com",
  	},
  	{
    	icon: faStackOverflow,
    	url: "https://stackoverflow.com",
  	},
];

const Header = () => {
	let transformStyle = useRef("");
	let position = useRef("fixed");

	useEffect(() => {
		let prevScrollPosition = window.pageYOffset;

		const handleScroll = ()=>{
			const currentScrollPosition = window.pageYOffset;
			//scrolls up
			if (prevScrollPosition > currentScrollPosition) {
				transformStyle.current = { "translateY": 0 };
				position.current = "fixed";
			}
			//scrolls down 
			else {
				transformStyle.current = { "translateY": -200 };
				position.current = "relative";
			}

			prevScrollPosition = currentScrollPosition;
		}

		window.addEventListener("scroll", handleScroll);

		return ()=>{
			window.removeEventListener("scroll", handleScroll);
		};
	})

	const handleClick = (anchor) => {
		const id = `${anchor}-section`;
		const element = document.getElementById(id);
    
		if (element) {
      		element.scrollIntoView({
				behavior: "smooth",
        		block: "start",
      		});
    	}
  	}

  	return (
		<Box position={position} top={0} left={0} right={0} translateY={0} transitionProperty="transform" transitionDuration="0.3s" 
			transitionTimingFunction="ease-in-out" backgroundColor="#18181b">
      		<Box color="white" maxWidth="1280px" margin="0 auto" transform={transformStyle}>
				<HStack px={16} py={4} justifyContent="space-between" alignItems="center">
					<nav>
						{socials.map(s => {
							return (
								<a key={s.url} href={s.url} style={{ marginLeft: '0.5em' }}>
									<FontAwesomeIcon icon={s.icon} size="2x" />
								</a>
							);
						})}
					</nav>
					<nav>
						<HStack spacing={8}>
							<a href="/#projects-section" onClick={handleClick("projects")}>Projects</a>
							<a href="/#contactme-section" onClick={handleClick("contactme")}>Contact Me</a>
						</HStack>
					</nav>
				</HStack>
			</Box>
		</Box>
	);
};
export default Header;
