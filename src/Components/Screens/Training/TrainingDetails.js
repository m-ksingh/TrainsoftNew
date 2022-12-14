
import { useContext, useState, useEffect } from "react";
import '../Batches/batches.css'
import './training.css'
import { TabBtn } from "../../Common/Buttons/Buttons";
import SearchBox from "../../Common/SearchBox/SearchBox";
import TrainingInfo from "./TrainingInfo/TrainingInfo";
import { Router } from "../../Common/Router";
import Session from "./Session/Session";
import Assessment from "./Assessment/Assessment";
import Forum from "./Forum/Forum";
import Report from "./Report/Report";
import { useNavigate } from "@reach/router"
import CardHeader from "../../Common/CardHeader";
import useToast from "../../../Store/ToastHook";
import moment from 'moment'
import AppContext from "../../../Store/AppContext";
import TrainingContext from "../../../Store/TrainingContext";
import RestService from "../../../Services/api.service";
import DropdownItem from "../../Common/DropdownItem/DropdownItem";
import VideoMediaPlayer from "./TrainingMediaPlayer/VideoMediaPlayer";
import "./TrainingMediaPlayer/MediaPlayer.css";
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import Feedback from "../../Common/Feedback/Feedback";
import { Link } from "@material-ui/core";
import Qa from "../../Common/QA/Qa";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SummarizeRoundedIcon from '@mui/icons-material/SummarizeRounded';

const TrainingDetails = ({ location }) => {
    const [trainingDetailsList, setTrainingDetailsList] = useState([]);
    const { spinner } = useContext(AppContext)
    // const {setTraining,training} = useContext(TrainingContext)
    // const Toast = useToast();
    const [vdlink, setVdlink] = useState("https://www.youtube.com/watch?v=RTagtaWSea4");
    const [feed, setFeed] = useState(false);
    const [modal, setModal] = useState(false);
    const training = [
        {

            "name": "October Batch Nodejs",
            "totalsection": "0 / 5 | 10 mint",
            "topics": [
                {
                    "description": "Introduction 1",
                    "videolink": "https://www.youtube.com/watch?v=XDjG4_m1bSY",
                    "islast": false
                },
                {
                    "description": "Introduction 2",
                    "videolink": "https://www.youtube.com/watch?v=1Rp15Svbu6E",
                    "islast": false
                },
                {
                    "description": "Introduction 3",
                    "videolink": "https://www.youtube.com/watch?v=9NqthBLHBDg",
                    "islast": false
                },
                {
                    "description": "Introduction 4",
                    "documentlink": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    "islast": false
                },
                {
                    "description": "Introduction 5",
                    "videolink": "https://www.youtube.com/watch?v=1Rp15Svbu6E",
                    "islast": true
                },

            ]

        },
        {

            "name": "October Batch Python",
            "totalsection": "0 / 4 | 15 mint",
            "topics": [
                {
                    "description": "Introduction 1",
                    "videolink": "https://www.youtube.com/watch?v=ysz5S6PUM-U",
                    "islast": false
                },
                {
                    "description": "Introduction 2",
                    "videolink": "https://www.youtube.com/watch?v=9NqthBLHBDg",
                    "islast": false
                },
                {
                    "description": "Introduction 3",
                    "videolink": "https://www.youtube.com/watch?v=ysz5S6PUM-U",
                    "islast": false
                },
                {
                    "description": "Introduction 4",
                    "documentlink": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    "islast": true
                }
            ]

        },
        {

            "name": "October Batch Ruby",
            "totalsection": "0 / 4 | 40 mint",
            "topics": [
                {
                    "description": "Introduction 1",
                    "videolink": "https://www.youtube.com/watch?v=ysz5S6PUM-U",
                    "islast": false
                },
                {
                    "description": "Introduction 2",
                    "videolink": "https://www.youtube.com/watch?v=9NqthBLHBDg",
                    "islast": false
                },
                {
                    "description": "Introduction 3",
                    "documentlink": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    "islast": false
                },
                {
                    "description": "Introduction 4",
                    "documentlink": "https://calibre-ebook.com/downloads/demos/demo.docx",
                    "islast": true
                }
            ]

        },
        {

            "name": "October Batch Java",
            "totalsection": "0 / 4 | 25 mint",
            "topics": [
                {
                    "description": "Introduction 1",
                    "videolink": "https://www.youtube.com/watch?v=ysz5S6PUM-U",
                    "islast": false
                },
                {
                    "description": "Introduction 2",
                    "videolink": "https://www.youtube.com/watch?v=9NqthBLHBDg",
                    "islast": false
                },
                {
                    "description": "Introduction 3",
                    "documentlink": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    "islast": false
                },
                {
                    "description": "Introduction 4",
                    "documentlink": "https://calibre-ebook.com/downloads/demos/demo.docx",
                    "islast": true
                }
            ]

        },
        {

            "name": "October Batch C++",
            "totalsection": "1 / 5 | 30 mint",
            "topics": [
                {
                    "description": "Introduction 1",
                    "videolink": "https://www.youtube.com/watch?v=ysz5S6PUM-U",
                    "islast": false
                },
                {
                    "description": "Introduction 2",
                    "videolink": "https://www.youtube.com/watch?v=9NqthBLHBDg",
                    "islast": false
                },
                {
                    "description": "Introduction 3",
                    "documentlink": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    "islast": false
                },
                {
                    "description": "Introduction 4",
                    "documentlink": "https://calibre-ebook.com/downloads/demos/demo.docx",
                    "islast": true
                }
            ]
        },
        {

            "name": "October Batch C",
            "totalsection": "0 / 4 | 50 mint",

            "topics": [
                {
                    "description": "Introduction 1",
                    "videolink": "https://www.youtube.com/watch?v=ysz5S6PUM-U",
                    "islast": false
                },
                {
                    "description": "Introduction 2",
                    "videolink": "https://www.youtube.com/watch?v=9NqthBLHBDg",
                    "islast": false
                },
                {
                    "description": "Introduction 3",
                    "documentlink": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    "islast": false
                },
                {
                    "description": "Introduction 4",
                    "documentlink": "https://calibre-ebook.com/downloads/demos/demo.docx",
                    "islast": true
                }
            ]

        }
    ]
    const navigate = useNavigate();


    function Show(url) {
        setVdlink(url);

    }
    function showFeedBack(val) {
        setFeed(val);
    }
    function modalF(val) {
        setModal(val)
    }
    const Modal = ({ handleClose, show, children }) => {
        const showHideClassName = show ? "modal d-block" : "modal d-none";

        return (

            <div className={showHideClassName}>

                <div className="modal-container">
                    <div style={{ marginLeft: "95%", marginTop: "-15px" }}> <a href="javascript:;" className="modal-close" onClick={handleClose}>
                        X
                    </a></div>
                    {children}

                </div>
            </div>
        );
    };

    const [configuration, setConfiguration] = useState({
        columns: {

            "contentName": {
                "title": "Content Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => <Link onClick={() => {

                    if (data.contentLink) {
                        Show(data.contentLink)
                    }
                    // else if (data.documentlink) {
                    //     Show(data.documentlink);
                    // }
                    //console.log(data.islast)
                    showFeedBack(data.last)
                    modalF(data.last);


                }} style={{ cursor: "pointer" }}> {(data.type === "VIDEO" || data.type === "EXTERNAL_LINK") ? <PlayCircleIcon /> : <SummarizeRoundedIcon />} {data.contentName}</Link>
            },
            // "description": {
            //     "title": "Description",
            //     "sortDirection": null,
            //     "sortEnabled": true,
            //     isSearchEnabled: false,

            // },
            // "contentLink": {
            //     "title": "Content Link",
            //     "sortDirection": null,
            //     "sortEnabled": true,
            //     isSearchEnabled: false,
            //     render: (data) => <Button onClick={() => window.open(`${data.contentLink}`, "_blank")} >Link</Button>
            // }
        },
        headerTextColor: '#454E50', // user can change table header text color
        sortBy: null,  // by default sort table by name key
        sortDirection: false, // sort direction by default true
        updateSortBy: (sortKey) => {
            configuration.sortBy = sortKey;
            Object.keys(configuration.columns).map(key => configuration.columns[key].sortDirection = (key === sortKey) ? !configuration.columns[key].sortDirection : false);
            configuration.sortDirection = configuration.columns[sortKey].sortDirection;
            setConfiguration({ ...configuration });
        },
        // actions: [
        //     {
        //         "title": "Edit",
        //         "icon": ICN_EDIT,
        //         // "onClick": (data, i) => { setIsEdit(true); setShow(true); setInitialValues({ name: data.name, description: data.description, sid: data.sid }) }
        //     },
        //     {
        //         "title": "Delete",
        //         "icon": ICN_TRASH,
        //         // "onClick": (data) => deleteCourse(data.sid)
        //     }
        // ],
        actionCustomClass: "no-chev esc-btn-dropdown", // user can pass their own custom className name to add/remove some css style on action button
        actionVariant: "", // user can pass action button variant like primary, dark, light,
        actionAlignment: true, // user can pass alignment property of dropdown menu by default it is alignLeft 
        // call this callback function onSearch method in input field on onChange handler eg: <input type="text" onChange={(e) => onSearch(e.target.value)}/>
        // this search is working for search enable fields(column) eg. isSearchEnabled: true, in tale column configuration
        searchQuery: "",
        tableCustomClass: "ng-table sort-enabled", // table custom class
        showCheckbox: true,
        clearSelection: false
    });

    const getTrainingContentsByTrainingSid = async () => {
        try {
            let trainingSid = location.state.sid;
            spinner.show();
            RestService.getTrainingContentsByTrainingSid(trainingSid).then(
                response => {
                    console.log(response.data.courseSectionResponseTO);
                    setTrainingDetailsList(response.data.courseSectionResponseTO);
                },
                err => {
                    spinner.hide();
                }
            ).finally(() => {
                spinner.hide();
            });
        } catch (err) {
            console.error("error occur on getSession()", err)
        }
    }

    //initialize component
    useEffect(() => {
        getTrainingContentsByTrainingSid();
    }, [])
    console.log(trainingDetailsList);
    // console.log(feed);
    return (
        <>
            <hr />

            {/* <div className="table-shadow p-3 ">
            <Router>
                <TrainingInfo path="/"/>
                <Session path="session" />
                <Assessment path="assessment" />
                <Report path="report" />
                <Forum path="forum" />
            </Router>

        </div> */}

            <div class="row">

                <div class="col-8  pl-3 " style={{ marginTop: "-15px" }}>
                    {/* <VideoMediaPlayer /> */}
                    {(vdlink.includes("youtube") || vdlink.includes("mp4")) ? <VideoMediaPlayer url={vdlink} />
                        : vdlink.includes("pdf") ? <iframe style={{ marginTop: "-2px" }} src={vdlink} width="100%" height="100%" />
                            : <div  style={{width:"130px",textAlign:"center", textDecoration:"none",color:"white", padding: "15px 20px", marginLeft: "280px", marginBottom: "50px", marginTop: "40px", border: "1px solid #49167E", borderRadius:"10px" }}><a href="/class" target='_blank' >Join Now</a></div>

                    }

                    <div class="tabset">

                        <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked />
                        <label for="tab1">Overview</label>

                        <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
                        <label for="tab2">Q&A</label>



                        <div class="tab-panels">
                            <section id="marzen" class="tab-panel">
                                <h2>6A. Overview</h2>
                                <p><strong>Overall Impression:</strong> An elegant, malty German amber lager with a clean, rich, toasty and bready malt flavor, restrained bitterness, and a dry finish that encourages another drink. The overall malt impression is soft, elegant, and complex, with a rich aftertaste that is never cloying or heavy.</p>
                                <p><strong>History:</strong> As the name suggests, brewed as a stronger ???March beer??? in March and lagered in cold caves over the summer. Modern versions trace back to the lager developed by Spaten in 1841, contemporaneous to the development of Vienna lager. However, the M??rzen name is much older than 1841; the early ones were dark brown, and in Austria the name implied a strength band (14 ??P) rather than a style. The German amber lager version (in the Viennese style of the time) was first served at Oktoberfest in 1872, a tradition that lasted until 1990 when the golden Festbier was adopted as the standard festival beer.</p>
                            </section>
                            <section id="rauchbier" class="tab-panel">
                                <Qa />
                            </section>


                        </div>

                    </div>




                </div>
                <div class="col-4 " style={{ height: "535px", overflowY: "scroll", marginLeft: "-12px", marginTop: "-15px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", background: "#F7F9FA", boxShadow: "#00000033 0px 0px 0px 1px, #00000033 0px 1px 1px -1px, #00000033 0px 1px 0px " }}>

                    {trainingDetailsList.map((train) => {
                        return (
                            <>
                                <div >

                                    <DropdownItem title={train.sectionName} total={train.courseContentResposeTOList.length} theme="dark" >


                                        <DynamicTable  {...{ configuration, sourceData: train.courseContentResposeTOList }} />
                                    </DropdownItem>
                                    {
                                        feed ? <Modal show={modal} handleClose={() => setModal(false)}>

                                            <Feedback sectionsid={train.sid} trainingsid={location.state.sid}   />

                                        </Modal> : ''
                                    }
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>




        </>

    )
}
export default TrainingDetails