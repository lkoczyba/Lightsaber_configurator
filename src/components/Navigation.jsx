import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"



const Navigation = ({currentUser}) => {

    return (
        <>
            <nav className="flex items-center space-x-4 h-[50px] w-full justify-between">
                <ul className="flex items-center gap-4 m-4">
                    <Button variant="link" asChild>
                        <li className="navigation__link"><Link to="/">Home</Link></li>
                    </Button>
                    <Button variant="link" asChild>
                        <li className="navigation__link"><Link to="/createLightsaber/EditOn">Create Lightsaber</Link>
                        </li>
                    </Button>
                    <Button variant="link" asChild>
                        <li className="navigation__link"><Link to="/gallery">Gallery</Link></li>
                    </Button>
                    <Button variant="link" asChild>
                        <li className="navigation__link"><Link to="/login">Sign Up</Link></li>
                    </Button>

                </ul>
                <p className="px-4">{currentUser.email}</p>
            </nav>
            <Separator/>
        </>
    );
};

export default Navigation;