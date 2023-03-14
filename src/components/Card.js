import { Heading, Image, Text, Card, CardBody, Stack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const ProjectCard = ({ title, description, imageSrc }) => {
	return (
		<Card maxW="md">
			<CardBody>
				<Image src={imageSrc} borderRadius="lg" />
				<Stack mt="3" spacing="2">
					<Heading color="black" size="md">{title}</Heading>
					<Text color="slategrey" size="sm">{description}</Text>
				</Stack>
				<Text color="black" mt="3">see more <FontAwesomeIcon icon={faArrowRight} size="1x" ml="5" /></Text>
			</CardBody>
		</Card>
	);
};

export default ProjectCard;
