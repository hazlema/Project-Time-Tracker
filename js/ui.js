/*******************************************************************
 * UI for Project Time Tracker
 * ============================
 *
 * Dependent on:
 *     Hammer.js: Gesture Events
 *     moo.js: MooTools! (Long live the cow)
 *
 * Auther:
 *     Matthew Hazlett
 *
 * 01/10/2014:
 *     Creation day (Many labor pains!)
 *
 * 01/11/2014:
 *     Removed MooTools morphing and went with CSS Animations
 *     They were having issues with some Mobile emu's
 ********************************************************************/

var UI = new Class({

	// For the initalizee gesture events
	//
	initialize: function () {
		this.mobile = Hammer(document.body);
		this.setEvents();
	},

	// Wire up the events
	//
	setEvents: function () {
		var self = this;
		
		// Wire the containers
		//
		document.getElements(".project-container").each(function (item, index) {
			Hammer(item).on('tap hold', function (e) {
				e.preventDefault();
				this.projectGesture(e);
			}.bind(self));
		});

		// Wire the edit boxeas
		//
		document.getElements(".project-edit").each(function (item, index) {
			Hammer(item).on('tap', function (e) {
				e.preventDefault();
				this.editGesture(e);
			}.bind(self));
		});
	},

	/*************************************************************************************
	 * Utility functions
	 *************************************************************************************/

	// Remove all the animation classes (we must be tidy)
	//
	clearAnimations: function () {
		var animCss = ['project-edit-hide', 'project-edit-reveal'];

		document.getElements(".project-edit").each(function (ele) {
			animCss.each(function (css) {
				if (ele.hasClass(css)) ele.removeClass(css);
			});
		});
	},

	// Run Animation 
	// (aka. Clear animations and add class to element)
	//
	runAnimation: function (ele, css) {
		this.clearAnimations();
		ele.addClass(css);
	},

	/*************************************************************************************
	 * Main UI
	 *************************************************************************************/

	// Dim the projects (Except the selected one)
	// TODO: Disable the gesture events
	//
	dimProjects: function (selected) {
		document.getElements(".project-container").each(function (ele) {
			if (selected != ele) ele.setStyle('opacity', '.3');
		});
	},

	// Un-Dim the projects
	// TODO: Enable the gestures
	//
	unDimProjects: function () {
		document.getElements(".project-container").setStyle('opacity', '1');
	},

	// When the user taps or clicks
	//
	projectGesture: function (event) {
		var thisElement = event.target.hasClass("project-container") ? event.target : event.target.getParent(".project-container");
		var thisEdit = thisElement.getNext('.project-edit');

		if (event.type == 'hold') {
			this.dimProjects(thisElement);
			this.runAnimation(thisEdit, 'project-edit-reveal');
		}
	},

	editGesture: function (event) {
		this.unDimProjects();
		this.runAnimation(event.target, 'project-edit-hide');
	}
});

window.addEvent('domready', function () {
	var ui = new UI();
});