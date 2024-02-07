import { Outlet } from "react-router-dom";
import "./HomePage.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useEffect, useMemo, useState } from "react";

function Home() {
    const [greet, setGreet] = useState('');
    const currentDate = useMemo(() => {
        return new Date();
    }, []);
    const day = currentDate.toLocaleDateString('default', { weekday: 'long' });
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const numberDay = currentDate.getDate();
    const year = currentDate.getFullYear();
    const date = `Today is ${day}, ${month} ${numberDay}, ${year}`;


    useEffect(() => {
        let currentHour = currentDate.getHours();
        if (currentHour < 12) {
            setGreet('Good Morning!')
        } else if (currentHour < 18) {
            setGreet('Good Afternoon!')
        } else setGreet('Good Evening!')
    }, [currentDate])


    return (
        <div className="app flex">
            <Sidebar />
            <div className="app-main">
                <header className="header w-100 flex align-center">
                    <div className="container w-100">
                        <div className="header-content flex align-center justify-between text-white py-3">
                            <div className="greetings">
                                <h3 className="fw-6">
                                    {greet}
                                </h3>
                            </div>
                            <div className="date">
                                <span className="text-uppercase fs-13 fw-4">
                                    {date}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
                <div className='notes-wrapper py-4 px-4'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Home