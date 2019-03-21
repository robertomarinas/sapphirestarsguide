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

  onSelectedDeco = (e, decoResults) => {
    
    const decoIndex = parseInt(e.target.getAttribute('data-deco-index'));
    const slotIndex = parseInt(e.target.getAttribute('data-slot-index'));
    
    const part = e.target.getAttribute('data-part');
    // const { partDecos, decoResults } = this.state.selectedArmorSet[part];
    const { partDecos } = this.state.selectedArmorSet[part];

    const updatePartDecos = partDecos.map((slot, index) => {
      if(slotIndex === index) {
        return { ...slot, active: false, ...decoResults[decoIndex] } 
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

    const armorType = e.target.getAttribute('data-equipment-type') ? e.target.getAttribute('data-equipment-type') : '';
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

  onRemoveEquipmentPart = (e) => {
    const armorPiece = e.target.getAttribute('data-equipment-type');

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

  // skill modifiers functions
  onSkillModifier = (skillObject) => {

    if(!skillObject) return;

    const currentSkillLevel = skillObject.value;
    const skillLevels = skillObject.ranks;
    let rank = currentSkillLevel - 1;

    if(currentSkillLevel > skillLevels.length) {
      rank = skillLevels[skillLevels.length - 1];
    }

    const skillModifiers = Object.entries(skillLevels[rank].modifiers);

    if(skillModifiers.length === 0) return {};

    return { }
  }

  onActiveSkills = (payload) => {
    this.setState(prevState => ({
      ...prevState,
      selectedArmorSet: {
        ...prevState.selectedArmorSet,
        activeSkills: payload
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
    //   const pattern =  new RegExp('(attack)', 'i');

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
            <ArmorLoadoutBuilder weaponList={this.state.weaponList} armorList={this.state.armorList} charmList={this.state.charmList} decorationList={this.state.decorationList} selectedArmorSet={this.state.selectedArmorSet} onSelectedArmor={this.onSelectedArmor} onSelectedDeco={this.onSelectedDeco} onRemoveDecoPiece={this.onRemoveDecoPiece} onRemoveEquipmentPart={this.onRemoveEquipmentPart} clearedArmorPart={this.state.clearedArmorPart} onSelectedWeapon={this.onSelectedWeapon} onSelectedCharm={this.onSelectedCharm} onCharmInputSearch={this.onCharmInputSearch} />
            <HunterStatus skillsList={this.state.skillsList} selectedArmorSet={this.state.selectedArmorSet} onSkillModifier={this.onSkillModifier} onActiveSkills={this.onActiveSkills} />
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