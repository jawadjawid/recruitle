import ApplicantProfilePage from "./ApplicantProfilePage"
import EmployerProfilePage from "./EmployerProfilePage"

export default function ProfilePage(props) {
    if (props.userType == "applicant") {
        return (
            <ApplicantProfilePage isSignedIn={props.isSignedIn}/>
        );
    } else {
        return (
            <EmployerProfilePage isSignedIn={props.isSignedIn}/>
        );
    }
    
}