

// ALL WEBPAGE STATE STORED HERE
// Init values respected

// If the selector is expanded or not
var topicSelector = true;
// Text content of the nav entry, empty string is front page
var topicEntryText = "HTML Documents";


/**
 * Expand or colapse the topic selector.
 * If state is specified, will ensure the panel is in that state.
 * 
 *
 From w3Schools https://www.w3schools.com/howto/howto_js_collapse_sidebar.asp
 */
function toggleTopicSelector(state = undefined) {
    const toggleButton = document.getElementById("toggleTopicSelectorButton");
    const selectorPanel = document.getElementById("topic_selector");

    const EXPAND_WIDTH = "25ch"; // Manually specify bc setting it to "fit-content" drops the animation
    const CONTRACT_WIDTH = "0px";

    function activate() {
        toggleButton.style.transform = "rotate(90deg)"
        toggleButton.style.position = "relative"; //TODO: Figure out why this works
        selectorPanel.style.width = EXPAND_WIDTH;
        topicSelector = true;
    }

    function deactivate() {
        toggleButton.style.transform = "rotate(-90deg)"
        toggleButton.style.position = "absolute";
        selectorPanel.style.width = CONTRACT_WIDTH;
        topicSelector = false;
    }

    if (state == undefined) {  
        topicSelector ? deactivate() : activate();   
    } else {
        state ? activate() : deactivate();
    }
}

/**
 * Sets the current topic, if empty string, do nothing.
 * Sets the source of the topic_view iframe.
 * Sets the global currentTopic variable.
 * Only the active topic may be display it's subtopics in the topic selector.
 * 
 * @param {String} topic Address of the topic html file.
 * @param {HTMLAnchorElement} entry The entry for this topic in the topic_selector.
 */
function activateTopic(topic, entry) {
    if (entry === undefined) {
        //alert("activateTopic() missing arg 'entry'")
    }
    if (topic == "") return;

    topicEntryId = topic;
    document.getElementById("topic_view").src = topic;

    // deactivate all the not-active entries
    Array.from(document.querySelectorAll("a"))
        .forEach(element => {
            
            element.classList.remove("active_topic_entry");

        })

    entry.classList.add("active_topic_entry");
}

/**
 * Call on main page onload=""
 */
function init() {
    // Set up the topic selector
    toggleTopicSelector(topicSelector);

    // Set the current topic by invoking it's onclick function
    var activeEntry;
    let topics =  document.querySelectorAll("nav > a");
    for (let i=0; i < topics.length; i++) {
        if (topics[i].innerText == topicEntryText) {
            activeEntry = topics[i];
            break;
        }
    }
    
    //TODO: For some reason, the "active_topic_entry" class isn't applied to th eactive entry on boot
    //activeEntry.classList.add("active_topic_entry");
    //alert(typeof activeEntry["onclick"]);
    activeEntry["onclick"].call();
    //alert(activeEntry.classList)
    
}