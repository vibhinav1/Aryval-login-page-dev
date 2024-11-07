'use client'
import { usePathname} from "next/navigation";

export default function NavHeader(){
    const path = "/events/test";
    return (
        <header>
            <ul className="flex navbar">
                <div className="flex-col mr-auto">
                    <li className="text-xl mr-auto" ><a href="/">Aryval</a></li>
                    <div className="breadcrumbs">
                        <ul>
                            <li>home</li>
                            <li>events</li>
                        </ul>
                    </div>
                </div>
                <li>Mail</li>
                <li>Notifications</li>
                <details className="dropdown dropdown-bottom dropdown-end">
                    <summary className="btn btn-ghost rounded-btn">Profile</summary>
                        <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a href="">Profile Details</a></li>
                            <li><a href="">Sign Out</a></li>
                        </ul>
                </details>
            </ul>
        </header>
    );
}
