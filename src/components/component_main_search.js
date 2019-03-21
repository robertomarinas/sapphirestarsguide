import React, { Component } from 'react';
import KeyResults from './component_key_results';
// importing svgs
import SearchButtonSVG from './component_search_button_svg';

class MainSearch extends Component {

	constructor(props) {
		super(props);

		this.state = {
			searchVal: "",
			radioSelect: "armor",
			keyResult: [],
			keyResultShow: true
		}
	}

	// componentDidUpdate(prevState) {
	// 	console.log('main-search updated');
	// }

	onInputSearch = (e) => {
		
		this.setState({ searchVal: e.target.value });
		// const mainSearchInput = e.target.value;

		if(e.target.value === "") {
			this.setState({ keyResult: [] });
			return;
		} 

		const patternMatch = new RegExp(`^${e.target.value}`, "i");

		let keyMatchedArr = [];

		if(this.state.radioSelect === 'armor') {
			this.props.armorList.forEach((gear, index) => {
				if(patternMatch.test(gear.name)) {
					keyMatchedArr = [ { armor: gear.name, slug: gear.slug, armorType: gear.type, index }, ...keyMatchedArr ]
				}
			});

			keyMatchedArr.sort((a,b) => a.armor > b.armor ? 1 : -1);

		} else if (this.state.radioSelect === 'skill') {
			this.props.armorList.forEach((gear, index) => {
				gear.skills.forEach(skill => {
					if(patternMatch.test(skill.skillName)) {
						keyMatchedArr = [ { armor: gear.name, slug: gear.slug, armorType: gear.type, level: skill.level, index, skills: [ ...gear.skills ] }, ...keyMatchedArr ]
					}
				})
			});

			keyMatchedArr.sort((a,b) => b.level - a.level);
		}

		this.setState({ keyResult: keyMatchedArr });

		// this.setState(prevState => ({
		// 	...prevState,
		// 	keyResult: keyMatchedArr
		// }));
	}

	onRadioChange = (e) => {
		this.setState({ searchVal: "" });
		this.setState({ keyResult: [] });
		this.setState({ radioSelect: e.target.value });
	}

	onButtonSubmit = (e) => {
		if(this.state.searchVal === "") {
			console.log('Input field is empty. Please enter your search keywords.');
			return;
		} else if(this.state.keyResult.length === 0) {
			console.log('Your search keywords did not match anything.');
			return;
		} else {
			console.log('Search keywords matched! Please select from the search results.');
			return;
		}
	}

	onResultsToggle = (e) => {
		this.setState(prevState => ({ keyResultShow: !prevState.keyResultShow }));
	}

	render() {

		return (
			<div>
				<div className="search-container">
					<div className="search-bar-container">
						<input className="search-bar" type="text" placeholder={this.state.radioSelect === 'armor' ? 'e.g. DragonKing Eyepatch Alpha' : 'e.g. Weakness Exploit'} onChange={this.onInputSearch} value={this.state.searchVal} />
						<button className="search-btn" onClick={this.onButtonSubmit}><SearchButtonSVG width={25} height={25} /></button>
					</div>

					<div className="advanced-search-container">
						<p>Search By: <span><input type="radio" name="searchBy" onChange={this.onRadioChange} checked={this.state.radioSelect === "armor"} value="armor"/>Armor</span> <span><input type="radio" name="searchBy" onChange={this.onRadioChange} checked={this.state.radioSelect === "skill"} value="skill"/>Skill</span></p>
					</div>
					
					<KeyResults keyResult={this.state.keyResult} radioSelect={this.state.radioSelect} onSelectedArmor={this.props.onSelectedArmor} onResultsToggle={this.onResultsToggle} keyResultShow={this.state.keyResultShow} />
				</div>
			</div>
			
		)	
	}
}

export default MainSearch;
