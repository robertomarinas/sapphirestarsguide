import React, { Component } from 'react';
import { connect } from 'react-redux';

import getWeaponList from './actions/action_getWeaponList';
import getArmorList from './actions/action_getArmorList';
import getCharmList from './actions/action_getCharmList';
import getDecorationList from './actions/action_getDecorationList';
import getSkillsList from './actions/action_getSkillsList';

import './App.css';

// imported Components
import MainSearch from './components/component_main_search';
import ArmorLoadoutBuilder from './components/component_armorLoadoutBuilder';
import HunterStatus from './components/component_hunter_status';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      weaponList: [],
      armorList: [],
      charmList: [],
      decorationList: [],
      skillsList: [],
      selectedArmorSet: {
        activeParts: [],
        activeSkills: {},
        activeSkillsText: '',
        selectedDecoList: {},
        weapon: {
          pieces: [],
          partDecos: null,
          searchString: '',
          decoSearchString: '',
          selected: null,
          results: [],
          decoResults: [],
         
        },
        head: {
          pieces: [],
          partDecos: [],
          searchString: '',
          selected: null,
          results: [],
          decoResults: [],
         
        }, 
        chest: {
          pieces: [],
          partDecos: [],
          searchString: '',
          selected: null,
          results: [],
          decoResults: [],
          
        }, 
        gloves: {
          pieces: [],
          partDecos: [],
          searchString: '',
          selected: null,
          results: [],
          decoResults: [],
         
        }, 
        waist: {
          pieces: [],
          partDecos: [],
          searchString: '',
          selected: null,
          results: [],
          decoResults: [],
       
        }, 
        legs: {
          pieces: [],
          partDecos: [],
          searchString: '',
          selected: null,
          results: [],
          decoResults: [],
      
        },
        charm: {
          pieces: [],
          partDecos: [],
          searchString: '',
          selected: null,
          results: [],
          decoResults: []
        }
      }
    }
  }

  componentWillMount() {
    this.props.getWeaponList();
    this.props.getArmorList();
    this.props.getCharmList();
    this.props.getDecorationList();
    this.props.getSkillsList();

    // console.log('App Component will mount..');
  }

  componentDidMount() {
    // console.log('App Component did mount..');
    // console.log(this.props.armorList);

    // this.setState({ armorList: [...this.props.armorList] });
  }

  componentDidUpdate(prevProps, prevState, snapshot) { 
    // fetch('./armorList.json')
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    if(this.props.armorList !== prevProps.armorList && this.props.weaponList !== prevProps.weaponList) {
      
      console.log('updating armorlist');
      
      let headPieces = [];
      let chestPieces = [];
      let glovesPieces = [];
      let waistPieces = [];
      let legsPieces = [];

      this.props.armorList.forEach(armor => {
        switch (armor.type) {
          case 'head':
            headPieces = [armor, ...headPieces];
            break;
          case 'chest':
            chestPieces = [armor, ...chestPieces];
            break;
          case 'gloves':
            glovesPieces = [armor, ...glovesPieces];
            break;
          case 'waist':
            waistPieces = [armor, ...waistPieces];
            break;
          case 'legs':
            legsPieces = [armor, ...legsPieces];
            break;
          default:
            break;
        }
      });

      this.setState(prevState => ({ 
        ...prevState,
        weaponList: [...this.props.weaponList],
        armorList: [...this.props.armorList],
        charmList: [...this.props.charmList],
        decorationList: [...this.props.decorationList],
        skillsList: [...this.props.skillsList],
        selectedArmorSet: {
          ...prevState.selectedArmorSet,
          head: {
            ...prevState.selectedArmorSet.head,
            pieces: headPieces
          },
          chest: {
            ...prevState.selectedArmorSet.chest,
            pieces: chestPieces
          },
          gloves: {
            ...prevState.selectedArmorSet.gloves,
            pieces: glovesPieces
          },
          waist: {
            ...prevState.selectedArmorSet.waist,
            pieces: waistPieces
          },
          legs: {
            ...prevState.selectedArmorSet.legs,
            pieces: legsPieces
          },
        } 
      }));
    }

    // check active skills state
    // if(this.state.selectedArmorSet.activeSkills !== )

    console.log('App Component Updated!');
  }

  onSelectedWeapon = (e) => {

    const weaponName = e.target.getAttribute('data-selected-weapon');
    const index = e.target.getAttribute('data-selected-index');

    const weaponList = this.state.weaponList;
    let updatedActivePartsArray = [];
    let selected = {};
    
    const activePartsRegEx =  new RegExp(`(weapon)`, 'gi');
    const activePartsText = this.state.selectedArmorSet.activeParts.toString();

    if(weaponList[index]['name'] === weaponName) {
      selected = weaponList[index];
    }

    if(activePartsRegEx.test(activePartsText)) {
      updatedActivePartsArray = [...this.state.selectedArmorSet.activeParts];
    } else {
      updatedActivePartsArray = ['weapon', ...this.state.selectedArmorSet.activeParts];
    }

    const decoState = selected.slots.map(slot => ({ rank: slot.rank, active: false, searchString: '' } ));

    this.setState(prevState => ({
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        activeParts: updatedActivePartsArray,
        weapon: {
          ...prevState.selectedArmorSet.weapon,
          partDecos: decoState,
          selected,
          results: []
        }
      }
    }));
  }

  onSelectedDeco = (e) => {
    
    const decoIndex = parseInt(e.target.getAttribute('data-deco-index'));
    const slotIndex = parseInt(e.target.getAttribute('data-slot-index'));
    
    const part = e.target.getAttribute('data-part');
    const { partDecos, decoResults } = this.state.selectedArmorSet[part];

    const updatePartDecos = partDecos.map((slot, index) => {
      if(slotIndex === index) {
        return { ...slot, active: false, ...decoResults[decoIndex] } 
        // return { ...slot, active: false, id: decoSkillId, skillName: decoSkillName, level: decoSkillLevel } 
      } else {
        return { ...slot, active: false }
      }
    });
    
    this.setState(prevState => ({
      ...prevState,
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        [part]: {
          ...prevState.selectedArmorSet[part],
          partDecos: updatePartDecos,
          decoResults: []
        }
      }

    }));
  }

  onSelectedCharm = (e) => {

    const charmName = e.target.getAttribute('data-selected-rank');
    const parentIndex = e.target.getAttribute('data-parent-index');
    const index = e.target.getAttribute('data-index');

    const charmList = this.state.charmList;
    let updatedActivePartsArray = [];
    let selected = {};
    
    const activePartsRegEx =  new RegExp(`(charm)`, 'gi');
    const activePartsText = this.state.selectedArmorSet.activeParts.toString();

    if(charmList[parentIndex]['ranks'][index]['name'] === charmName) {
      selected = charmList[parentIndex]['ranks'][index];
    }

    if(activePartsRegEx.test(activePartsText)) {
      updatedActivePartsArray = [...this.state.selectedArmorSet.activeParts];
    } else {
      updatedActivePartsArray = ['charm', ...this.state.selectedArmorSet.activeParts];
    }

    this.setState(prevState => ({
      ...prevState,
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        activeParts: updatedActivePartsArray,
        charm: {
          ...prevState.selectedArmorSet.charm,
          selected,
          results: []
        }
      }
    }));
  }

  onSelectedArmor = (e) => {

    const armorType = e.target.getAttribute('data-armor-type') ? e.target.getAttribute('data-armor-type') : '';
    const armorName = e.target.getAttribute('data-selected-armor') ? e.target.getAttribute('data-selected-armor') : '';
    const index = e.target.getAttribute('data-selected-index');
    const searchBar = e.target.getAttribute('data-search-bar');
    
    // check if an equipment is selected..
    let selectedArmor = {};
    
    // check if selecting/clicking a search result from the Main Search Bar
    if(searchBar === null) {
      if(this.state.selectedArmorSet[armorType]['pieces'][index]['name'] === armorName) {
        selectedArmor = this.state.selectedArmorSet[armorType]['pieces'][index];
      }
    } else {
      selectedArmor = this.state.armorList[index];
    }
    
    // check if part is already selected..
    const activePartsRegEx =  new RegExp(`(${armorType})`, 'gi');
    const activePartsText = this.state.selectedArmorSet.activeParts.toString();
    let updatedActivePartsArray = [];

    if(activePartsRegEx.test(activePartsText)) {
      updatedActivePartsArray = [...this.state.selectedArmorSet.activeParts];
    } else {
      updatedActivePartsArray = [armorType, ...this.state.selectedArmorSet.activeParts];
    }
    
    // setting up the Equipment Slots state
    const decoState = selectedArmor.slots.map(slot => ({ rank: slot.rank, active: false, searchString: '' } ));

    this.setState(prevState => ({
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        activeParts: updatedActivePartsArray,
        [armorType]: {
          ...prevState.selectedArmorSet[armorType],
          partDecos: decoState,
          selected: selectedArmor,
          results: []
        }
      }
    }));
  }

  onFocusPartSearch = (e) => {
    this.setState(prevState => ({
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        weapon: {
          ...prevState.selectedArmorSet.weapon,
          results: [],
          decoResults: []
        },
        head: {
          ...prevState.selectedArmorSet.head,
          results: [],
          decoResults: []
        }, 
        chest: {
          ...prevState.selectedArmorSet.chest,
          results: [],
          decoResults: []
        }, 
        gloves: {
          ...prevState.selectedArmorSet.gloves,
          results: [],
          decoResults: []
        }, 
        waist: {
          ...prevState.selectedArmorSet.waist,
          results: [],
          decoResults: []
        }, 
        legs: {
          ...prevState.selectedArmorSet.legs,
          results: [],
          decoResults: []
        },
        charm: {
          ...prevState.selectedArmorSet.charm,
          results: [],
          decoResults: []
        }
      }
    }));
  }

  onFocusSlotSearch = (e) => {

    const slotIndex = parseInt(e.target.getAttribute('data-slot-index'));
    const slotRank = parseInt(e.target.getAttribute('data-slot-rank'));
    const equipmentPart = e.target.getAttribute('data-part');
    const { partDecos } = this.state.selectedArmorSet[equipmentPart];
    const decoPieces =  this.state.decorationList;
    let decoResults = [];

    const updatePartDecos = partDecos.map((slot,index) => {
      if(slotIndex === index) {
        return { ...slot, active: true }
      } else {
        return { ...slot, active: false }
      }
    });

    decoPieces.forEach(deco => {
      if(deco.slot <= slotRank ) {
        deco.skills.forEach(skill => {
          decoResults = [ { id: skill.id, skillName: skill.skillName, level: skill.level, slotRank, slot: deco.slot }, ...decoResults ]
        });
      }
    });

    // Sort Deco Results..
    decoResults.sort((a,b) => a.skillName > b.skillName ? 1 : -1);

    // To Clear global search results...
    this.onFocusPartSearch();
    this.setState(prevState => ({
      ...prevState,
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        [equipmentPart]: {
          ...prevState.selectedArmorSet[equipmentPart],
          partDecos: updatePartDecos,
          decoResults,
          results: []
        }
      }
    }));
  }

  onWeaponInputSearch = (e) => {

    // add RegEx input checker here..
    const searchString = e.target.value;
    const pattern = new RegExp(`^${e.target.value}`,'i');
    let weaponSearchResults = [];
    const weaponPieces = this.state.weaponList;

    // // Sort Weapon Pieces..
    weaponPieces.sort((a,b) => a.name < b.name ? 1 : -1);

    weaponPieces.forEach((weapon, index) => {
      if(pattern.test(weapon.name) && e.target.value !== '') {
        weaponSearchResults = [<li key={index}><button data-selected-weapon={weapon.name} data-selected-index={index} onClick={this.onSelectedWeapon}>{weapon.name}</button></li>, ...weaponSearchResults ];
      }
    });

    this.setState(prevState => ({
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        weapon: {
          ...prevState.selectedArmorSet.weapon,
          searchString,
          selected: null,
          results: weaponSearchResults
        }
      }
    }));
  }

  onCharmInputSearch = (e) => {

    // add RegEx input checker here..
    const searchString = e.target.value;
    const pattern = new RegExp(`^${e.target.value}`,'i');
    let charmSearchResults = [];
    const charmPieces = this.state.charmList;

    // // Sort Charm Pieces..
    charmPieces.sort((a,b) => a.name < b.name ? 1 : -1);

    charmPieces.forEach((charm, parentIndex) => {
      if(pattern.test(charm.name) && e.target.value !== '') {
        const charmRanks = charm.ranks.map((rank, index) => {
          return <li key={index}><button data-selected-rank={rank.name} data-parent-index={parentIndex} data-index={index} onClick={this.onSelectedCharm}>{rank.name}</button></li>
        });

        charmSearchResults = [charmRanks, ...charmSearchResults]
      }
    });

    this.setState(prevState => ({
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        charm: {
          ...prevState.selectedArmorSet.charm,
          searchString,
          selected: null,
          results: charmSearchResults
        }
      }
    }));
  }

  onDecoInputSearch = (e) => {
    
    // write a RegEx here..
    const searchString = e.target.value;
    const decoIndex = parseInt(e.target.getAttribute('data-slot-index'));
    const part = e.target.getAttribute('data-part');
    const slotRank = parseInt(e.target.getAttribute('data-slot-rank'));

    const decoPieces = this.state.decorationList;
    const partDecos = this.state.selectedArmorSet[part].partDecos;

    let pattern = new RegExp(`^(${e.target.value})`,'i');
    let decoResults = [];

    decoPieces.forEach(deco => {
      deco.skills.forEach(skill => {
        if(pattern.test(skill.skillName)) {
          if(deco.slot <= slotRank) {
            decoResults = [ { id: skill.id, skillName: skill.skillName, slotRank,  slot: deco.slot, level: skill.level }, ...decoResults ];
          }
        }
      });
    });

    const updatePartDecos = partDecos.map((slot, index) => {
      if(decoIndex === index) {
        return { ...slot, active: true, searchString }
      } else {
        return { ...slot, active: false }
      }
    });

    // Sort Deco Results..
    decoResults.sort((a,b) => a.skillName > b.skillName ? 1 : -1);

    this.setState(prevState => ({
      ...prevState,
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        [part]: {
          ...prevState.selectedArmorSet[part],
          partDecos: updatePartDecos,
          decoResults,
        }
      }
    }));
  }

  onInputPartSearch = (e) => {
    const armorType = e.target.getAttribute('data-armor-type');
    const armorPieces = this.state.selectedArmorSet[armorType]['pieces'];

    let armorSearchResults = [];
    let searchString = e.target.value;
    let pattern = new RegExp(`^${e.target.value}`,'i');

    // // Sort Armor Pieces..
    armorPieces.sort((a,b) => a.name < b.name ? 1 : -1);

    armorPieces.forEach((armor, index) => {
      if(pattern.test(armor.name) && e.target.value !== '') {
        
        armorSearchResults = [<li key={index}><button data-armor-type={armor.type} data-selected-armor={armor.name} data-selected-index={index} onClick={this.onSelectedArmor}>{armor.name}</button></li>, ...armorSearchResults ];
      }
    });



    this.setState(prevState => ({
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        [armorType]: {
          ...prevState.selectedArmorSet[armorType],
          searchString,
          selected: null,
          results: armorSearchResults
        }
      }
    }));
  }

  onRemoveDecoPiece = (e) => {
    
    const part = e.target.getAttribute('data-part');
    const slotIndex = parseInt(e.target.getAttribute('data-slot-index'));
    const partDecos = this.state.selectedArmorSet[part].partDecos;
    let updatePartDecos = partDecos.map((slot, index) => {

      if(slotIndex === index) {
        return { rank: slot.rank, active: false, searchString: '' }  
      } else {
        return { ...slot, active: false }
      }

    });

    this.setState(prevState => ({
      ...prevState,
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        [part]: {
          ...prevState.selectedArmorSet[part],
          partDecos: updatePartDecos,
          decoResults: []
        }
      }
    }));
  }

  onRemoveArmorPiece = (e) => {
    const armorPiece = e.target.getAttribute('data-armor-piece');

    this.setState(prevState => ({
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        activeParts: prevState.selectedArmorSet.activeParts.filter(part => part !== armorPiece),
        [armorPiece]: {
          ...prevState.selectedArmorSet[armorPiece],
          partDecos: null,
          searchString: '',
          selected: null,
          results: []
        }
      }
    }));
  }

  render() {

    // console.log(this.state.weaponList);
    // console.log(this.state.decorationList);
    // console.log(this.state.skillsList);
    // console.log(this.state.selectedArmorSet);
    // console.log(this.state.charmList);

    // this.state.skillsList.forEach(skill => {
    //   const pattern =  new RegExp('(element)', 'i');

    //   if(pattern.test(skill.description)) {
    //     console.log(skill);
    //   }
    // });

    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <h1><a href="/">SapphireStar's Guide</a></h1>
            <MainSearch armorList={this.state.armorList} onSelectedArmor={this.onSelectedArmor} />
          </div>
        </header>
        <div className="container">
          <div className="main-content">
            <ArmorLoadoutBuilder weaponList={this.state.weaponList} armorList={this.state.armorList} charmList={this.state.charmList} decorationList={this.state.decorationList} selectedArmorSet={this.state.selectedArmorSet} onSelectedArmor={this.onSelectedArmor} onSelectedDeco={this.onSelectedDeco} onRemoveDecoPiece={this.onRemoveDecoPiece} onRemoveArmorPiece={this.onRemoveArmorPiece} clearedArmorPart={this.state.clearedArmorPart} onWeaponInputSearch={this.onWeaponInputSearch} onCharmInputSearch={this.onCharmInputSearch} onDecoInputSearch={this.onDecoInputSearch} onInputPartSearch={this.onInputPartSearch} onFocusPartSearch={this.onFocusPartSearch} onFocusSlotSearch={this.onFocusSlotSearch} onBlurSearch={this.onBlurSearch} onBlurContainer={this.onBlurContainer} onFocusContainer={this.onFocusContainer} />
            <HunterStatus skillsList={this.state.skillsList} selectedArmorSet={this.state.selectedArmorSet}  />
            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
 weaponList: state.weaponListReducer.result,
 armorList: state.armorListReducer.result,
 charmList: state.charmListReducer.result,
 decorationList: state.decorationListReducer.result,
 skillsList: state.skillsListReducer.result,
});

const mapDispatchToProps = dispatch => ({
 getWeaponList: () => dispatch(getWeaponList()),
 getArmorList: () => dispatch(getArmorList()),
 getCharmList: () => dispatch(getCharmList()),
 getDecorationList: () => dispatch(getDecorationList()),
 getSkillsList: () => dispatch(getSkillsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);