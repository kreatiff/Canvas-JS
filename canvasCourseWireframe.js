/**
 * Helper function to retrieve the ID of a course taken from the URL
 * @returns The ID of a course as a number
 */
const getCourseID = () => {
	const url = window.location.href.split('/')
	const id = url.indexOf('courses') + 1
	return url[id]
}
// Request course ID using getCourseID
const courseID = getCourseID()
/**
 * API Call to retrieve information about a given course
 * @param {Number} id The course ID of a given course
 * @returns JSON object of course info
 */
const getCourseInfo = async (id) => {
	// courseID can be retrieved from the URL using window.location.href
	const url = `https://lms-dev.griffith.edu.au/api/v1/courses/${id}/`
	try {
		let res = await fetch(url)
		return await res.json()
	} catch (e) {
		console.error(e)
	}
}
// request course info using course id pulled from URL
const courseInfo = await getCourseInfo(courseID)
// Find course title div
const course_title = document.getElementById(
	`kl_custom_block_home-page-course-title`
)
// Remove any existing content from course title div
course_title.innerHTML = ``
// Set courseCode and courseName
const courseCode = `<p>${courseInfo.course_code}</p>`
const courseName = `<h2>${courseInfo.name}</h2>`
// Update course title with courseCode and courseName
course_title.innerHTML += courseCode
course_title.innerHTML += courseName

// Navigation links
// Each link has had it's ID replaced with ${courseID} to work on any course
const learningJourney = `<li id="kl_nav_item_0" class=""><a class="" href="https://lms-dev.griffith.edu.au/courses/${courseID}/pages/learning-journey" data-api-returntype="Page" data-api-endpoint="https://lms-dev.griffith.edu.au/api/v1/courses/${courseID}/pages/learning-journey"><i class="far fa-compass" aria-hidden="true"><span class="dp-icon-content" style="display: none;">&nbsp;</span></i>Learning Journey</a></li>`
const courseProfile = `<li id="kl_nav_item_1"><a class="" href="https://lms-dev.griffith.edu.au/courses/${courseID}/pages/course-profile" data-api-returntype="Page" data-api-endpoint="https://lms-dev.griffith.edu.au/api/v1/courses/${courseID}/pages/course-profile"><i class="icon-document" aria-hidden="true">&nbsp;</i>Course Profile</a></li>`
const assessment = `<li id="kl_nav_item_2" class=""><a class="" href="https://lms-dev.griffith.edu.au/courses/${courseID}/pages/assessment-overview" data-api-returntype="Page" data-api-endpoint="https://lms-dev.griffith.edu.au/api/v1/courses/${courseID}/pages/assessment-overview"><i class="icon-assignment" aria-hidden="true">&nbsp;</i>Assessment</a></li>`
const teachingStaff = `<li id="kl_nav_item_3" class=""><a class="" href="https://lms-dev.griffith.edu.au/courses/${courseID}/pages/teaching-staff" data-api-returntype="Page" data-api-endpoint="https://lms-dev.griffith.edu.au/api/v1/courses/${courseID}/pages/teaching-staff"><i class="icon-group" aria-hidden="true">&nbsp;</i>Teaching Staff</a></li>`
// Find course navigation div
const courseNavigation = document.getElementById('kl_navigation')
// Remove any existing content from course navigation div
courseNavigation.innerHTML = ``
// Links to display in the navigation bar under the profile banner
const navLinks = `<ul class="kl_nav_list_1">${learningJourney}${courseProfile}${assessment}${teachingStaff}</ul>`
// Update course navigation with nav links
courseNavigation.innerHTML += navLinks
