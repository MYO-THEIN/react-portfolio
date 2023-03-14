import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Textarea, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LandingSection = () => {
	const { response, submit, isLoading } = useSubmit();
	const { onOpen } = useAlertContext();

	const validate = values => {
		const errors = {};
		// firstName
		if (!values.firstName) {
			errors.firstName = "Required";
		}

		// email
		if (!values.email) {
			errors.email = "Required";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = "Invalid email address";
		}

		// type
		if (!values.type) {
			errors.type = "Required";
		} else if (values.type === "chooseOne") {
			errors.type = "Choose one of the options";
		}

		// comment
		if (!values.comment) {
			errors.comment = "Required";
		} else if (values.comment.length < 25) {
			errors.comment = "Must be at least 25 characters";
		}
  
		return errors;
	};

	const formik = useFormik({
    	initialValues: {
			firstName: "",
			email: "",
			type: "",
			comment: ""
		},
		validate,
    	onSubmit: async (values, { setSubmitting, resetForm }) => {
			setSubmitting(false);
			await submit("http://www.google.com", values);
			if (response) {
				onOpen(response.type, response.message);
				resetForm();
			}
		}
	});

	return (
		<FullScreenSection isDarkBackground backgroundColor="#512DA8" py={16} spacing={8}>
      		<VStack w="1024px" p={32} alignItems="flex-start">
        		<Heading as="h1" id="contactme-section">Contact me</Heading>
        		<Box p={6} rounded="md" w="100%">
					<form onSubmit={formik.handleSubmit}>
						<VStack spacing={4}>
							<FormControl isInvalid={false}>
								<FormLabel htmlFor="firstName">Name</FormLabel>
								<Input id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} 
									style={formik.errors.firstName ? {border: "2px solid red"} : null} />
								{formik.errors.firstName ? 
									<div style={{color: "red"}}>{formik.errors.firstName}</div> : null}
							</FormControl>
			
							<FormControl isInvalid={false}>
								<FormLabel htmlFor="email">Email</FormLabel>
								<Input id="email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} 
									style={formik.errors.email ? {border: "2px solid red"} : null} />
								{formik.errors.email ? 
									<div style={{color: "red"}}>{formik.errors.email}</div> : null}
							</FormControl>
			
							<FormControl isInvalid={false}>
								<FormLabel htmlFor="type">Type of enquiry</FormLabel>
								<Select id="type" name="type" value={formik.values.type} onChange={formik.handleChange} onBlur={formik.handleBlur}
									style={formik.errors.type ? {border: "2px solid red"} : null}>
									<option value="chooseOne">choose ...</option>
									<option value="hireMe">Freelance project proposal</option>
									<option value="openSource">Open source consultancy session</option>
									<option value="other">Other</option>
								</Select>
								{formik.errors.type ?
									<div style={{color: "red"}}>{formik.errors.type}</div> : null}
							</FormControl>
			
							<FormControl isInvalid={false}>
								<FormLabel htmlFor="comment">Your message</FormLabel>
								<Textarea id="comment" name="comment" height={250} value={formik.values.comment} onChange={formik.handleChange} onBlur={formik.handleBlur} 
									style={formik.errors.comment ? {border: "2px solid red"} : null} />
								{formik.errors.comment ?
									<div style={{color: "red"}}>{formik.errors.comment}</div> : null}
							</FormControl>
			
							<Button type="submit" colorScheme="purple" width="full">
								{isLoading && <FontAwesomeIcon icon={faSpinner} size="1x" spin={true} />}
								<span style={{marginLeft: "10px"}}>Submit</span>
							</Button>
						</VStack>
					</form>
        		</Box>
      		</VStack>
    	</FullScreenSection>
	);
};

export default LandingSection;
