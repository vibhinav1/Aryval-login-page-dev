import Link from "next/link"

export default function EventsPage(){
return (
    <div className="flex p-4 space-x-4">
        {/* Event History Section */}
        <section className="flex h-full">
            <div className="bg-base-100 w-50 shadow-xl">
                <h2 className="text-center p-3">Event History</h2>
                <ul className="p-3">
                    <li><a>Event History #1</a></li>
                    <li><a>Event History #2</a></li>
                </ul>
            </div>
        </section>
        <div className="flex flex-col space-y-4">
            {/* Main Event Content Section */}
            <section>
                {/* Event Sorting */}
                <div className="flex items-center">
                    {/* Search Bar */}
                    <input type="text" className="input grow" placeholder="Search" />
                    {/* The Filter Buttons */}
                    <div>
                        <details className="dropdown dropdown-bottom dropdown-end">
                            <summary className="btn m-1">Sort By</summary>
                            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Earliest</a></li>
                                <li><a>Latest</a></li>
                            </ul>
                        </details>
                        <details className="dropdown dropdown-bottom dropdown-end">
                            <summary className="btn m-1">Type</summary>
                            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>Open House</a></li>
                                <li><a>Ambassador Tour</a></li>
                                <li><a>Shadow Day</a></li>
                            </ul>
                        </details>
                    </div>
                </div>

                {/* Event Listing */}
                <div>
                    <ul className="flex">
                        <li className="p-3">
                            <div className="card bg-base-100 w-96 shadow-xl">
                                {/* IMAGE PLACEHOLDER <figure>*/}
                                <div className="card-body">
                                    <h2 className="card-title">Event #1</h2>
                                    <p>Date</p>
                                    <p>Description</p>
                                    <Link href="./events/test-event1" className="card-actions">
                                        <button className="btn btn-primary">View</button>
                                    </Link>
                                </div>
                            </div>
                        </li>
                        <li className="p-3">
                            <div className="card bg-base-100 w-96 shadow-xl">
                                {/* IMAGE PLACEHOLDER <figure>*/}
                                <div className="card-body">
                                    <h2 className="card-title">Event #2</h2>
                                    <p>Date</p>
                                    <p>Description</p>
                                    <Link href="./events/test-event2" className="card-actions">
                                        <button className="btn btn-primary">View</button>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                    {/* ADD Pagination */}
                </div>
            </section>
            {/* Registered Event Section */}
            <section>
                <div>
                    <details tabIndex={0} className="collapse collapse-arrow bg-base-100 w-96 shadow-xl" open>
                        <summary className="collapse-title text-xl font-medium">Registered Events</summary>
                        <ul className="collapse-content">
                            <li><a>registered event #1</a></li>
                            <li><a>registered event #2</a></li>
                        </ul>
                    </details>
                </div>
            </section>
        </div>
    </div>
);
}