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
import DynamicTable from "../../Common/DynamicTable/DynamicTable";
import Feedback from "../../Common/Feedback/Feedback";

const TrainingDetails = ({ location }) => {
    const [trainingDetailsList, setTrainingDetailsList] = useState([]);
    const { spinner } = useContext(AppContext)
    // const {setTraining,training} = useContext(TrainingContext)
    // const Toast = useToast();
    const training = [
        {

            "name": "October Batch Nodejs",
            "topics": [
                {
                    "description": "Introduction 1"
                },
                {
                    "description": "Introduction 2"
                },
                {
                    "description": "Introduction 3"
                },
                {
                    "description": "Introduction 4"
                },
                {
                    "description": "Introduction 5"
                },
                
            ]

        },
        {

            "name": "October Batch Python",
            "topics": [
                {
                    "description": "Introduction 1"
                },
                {
                    "description": "Introduction 2"
                },
                {
                    "description": "Introduction 3"
                },
                {
                    "description": "Introduction 4"
                }
            ]

        },
        {

            "name": "October Batch Ruby",
            "topics": [
                {
                    "description": "Introduction 1"
                },
                {
                    "description": "Introduction 2"
                },
                {
                    "description": "Introduction 3"
                },
                {
                    "description": "Introduction 4"
                }
            ]

        },
        {

            "name": "October Batch Java",
            "topics": [
                {
                    "description": "Introduction 1"
                },
                {
                    "description": "Introduction 2"
                },
                {
                    "description": "Introduction 3"
                },
                {
                    "description": "Introduction 4"
                }
            ]

        },
        {

            "name": "October Batch C++",
            "topics": [
                {
                    "description": "Introduction 1"
                },
                {
                    "description": "Introduction 2"
                },
                {
                    "description": "Introduction 3"
                },
                {
                    "description": "Introduction 4"
                }
            ]
        },
        {

            "name": "October Batch C",
            "topics": [
                {
                    "description": "Introduction 1"
                },
                {
                    "description": "Introduction 2"
                },
                {
                    "description": "Introduction 3"
                },
                {
                    "description": "Introduction 4"
                }
            ]

        },
        {

            "name": "October Batch C",
            "topics": [
                {
                    "description": "Introduction 1"
                },
                {
                    "description": "Introduction 2"
                },
                {
                    "description": "Introduction 3"
                },
                {
                    "description": "Introduction 4"
                }
            ]

        },
        {

            "name": "October Batch C",
            "topics": [
                {
                    "description": "Introduction 1"
                },
                {
                    "description": "Introduction 2"
                },
                {
                    "description": "Introduction 3"
                },
                {
                    "description": "Introduction 4"
                }
            ]

        },
        {

            "name": "October Batch C",
            "topics": [
                {
                    "description": "Introduction 1"
                },
                {
                    "description": "Introduction 2"
                },
                {
                    "description": "Introduction 3"
                },
                {
                    "description": "Introduction 4"
                }
            ]

        }
        , {

            "name": "October Batch C",
            "topics": [
                {
                    "description": "Introduction 1"
                },
                {
                    "description": "Introduction 2"
                },
                {
                    "description": "Introduction 3"
                },
                {
                    "description": "Introduction 4"
                }
            ]

        },
        {

            "name": "October Batch D",
            "topics": [
                {
                    "description": "Introduction 1"
                },
                {
                    "description": "Introduction 2"
                },
                {
                    "description": "Introduction 3"
                },
                {
                    "description": "Introduction 4"
                }
            ]

        }
    ]
    const navigate = useNavigate();

    const [configuration, setConfiguration] = useState({
        columns: {

            "description": {
                "title": "Content Name",
                "sortDirection": null,
                "sortEnabled": true,
                isSearchEnabled: false,
                render: (data) => data.description
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

    // const getTrainingContentsByTrainingSid = async () => {
    //     try {
    //         let trainingSid = location.state.sid;
    //         spinner.show();
    //         RestService.getTrainingContentsByTrainingSid(trainingSid).then(
    //             response => {
    //                 console.log(response.data);
    //                 setTrainingDetailsList(response.data);
    //             },
    //             err => {
    //                 spinner.hide();
    //             }
    //         ).finally(() => {
    //             spinner.hide();
    //         });
    //     } catch (err) {
    //         console.error("error occur on getSession()", err)
    //     }
    // }

    // initialize component
    // useEffect(() => {
    //     getTrainingContentsByTrainingSid();
    // }, [])
    // console.log(location.state.sid);
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

                    <div class="col-8  pl-3 " >
                        <VideoMediaPlayer />
                        <div class="tabset">
 
  <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked/>
  <label for="tab1">Overview</label>

  <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier"/>
  <label for="tab2">Q&A</label>
 
  <input type="radio" name="tabset" id="tab3" aria-controls="dunkles"/>
  <label for="tab3">Review</label>
  
  <div class="tab-panels">
    <section id="marzen" class="tab-panel">
      <h2>6A. Overview</h2>
      <p><strong>Overall Impression:</strong> An elegant, malty German amber lager with a clean, rich, toasty and bready malt flavor, restrained bitterness, and a dry finish that encourages another drink. The overall malt impression is soft, elegant, and complex, with a rich aftertaste that is never cloying or heavy.</p>
      <p><strong>History:</strong> As the name suggests, brewed as a stronger “March beer” in March and lagered in cold caves over the summer. Modern versions trace back to the lager developed by Spaten in 1841, contemporaneous to the development of Vienna lager. However, the Märzen name is much older than 1841; the early ones were dark brown, and in Austria the name implied a strength band (14 °P) rather than a style. The German amber lager version (in the Viennese style of the time) was first served at Oktoberfest in 1872, a tradition that lasted until 1990 when the golden Festbier was adopted as the standard festival beer.</p>
  </section>
    <section id="rauchbier" class="tab-panel">
      <h2>6B. Q&A</h2>
      <p><strong>Overall Impression:</strong>  An elegant, malty German amber lager with a balanced, complementary beechwood smoke character. Toasty-rich malt in aroma and flavor, restrained bitterness, low to high smoke flavor, clean fermentation profile, and an attenuated finish are characteristic.</p>
      <p><strong>History:</strong> A historical specialty of the city of Bamberg, in the Franconian region of Bavaria in Germany. Beechwood-smoked malt is used to make a Märzen-style amber lager. The smoke character of the malt varies by maltster; some breweries produce their own smoked malt (rauchmalz).</p>
    </section>
   
    <section id="dunkles" class="tab-panel">
      <Feedback/>
    </section>
  </div>
  
</div>




                    </div>
                    <div class="col-4 pl-3" style={{height:"535px", overflowY:"scroll",border:"1px solid #00000033",borderTopLeftRadius:"10px",borderTopRightRadius:"10px",  background:"#F7F9FA", boxShadow: "#00000033 0px 0px 0px 1px, #00000033 0px 1px 1px -1px, #00000033 0px 1px 0px " }}>

                        {training.map((train) => {
                            return (
                                <>
                                    <div >
                                
                                    <DropdownItem title={train.name} theme="dark" >
                                      

<DynamicTable  {...{configuration, sourceData: train.topics}}  />
</DropdownItem>
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