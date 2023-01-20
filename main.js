//Base Strings

// Creating arrays of lower and uppercase chars

const baseArray = Array.from(Array(26)).map((_, i) => i + 97);

const lowerCaseCharArray = baseArray.map((ele) => String.fromCharCode(ele));
const upperCaseCharArray = lowerCaseCharArray.map((ele) => {
	return ele.toUpperCase();
});

//digits
const digitsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
//symbols
const symbolsArray = ["!", "@", "#", "$", "%", "^", "&", "*", "~"];

let isUpper = false,
	isLower = false,
	isDigit = false,
	isSymbol = false;

let rating = 0;

const passwordLengthLabel = document.querySelector(".pLengthLabel");
const passwordScale = document.querySelector(".pLengthScale");
const password = document.querySelector(".password");
const passwordRatingScale = document.querySelector(".ratingScale");
let passwordLength = 8;
const passwordForm = document.querySelector(".passwordOptionsForm");
const passwordConfig = document.querySelectorAll(".passwordOption");
const generatedPasswordDisplay = document.querySelector(".generatedPassword");
const copyIcon = document.querySelector(".copyIcon");

passwordConfig.forEach((ele) => {
	ele.checked = false;
	console.log(ele);
});

// add a event listner of on change to passwordOption and updates the state
// for us to choose the base string for password gen

passwordConfig.forEach((option) => {
	option.addEventListener("change", (e) => {
		if (option.checked) {
			switch (e.target.value) {
				case "upper":
					isUpper = true;
					rating++;
					break;

				case "lower":
					isLower = true;
					rating++;
					break;
				case "digit":
					isDigit = true;
					rating++;
					break;
				case "symbol":
					isSymbol = true;
					rating++;
					break;
			}
		}
		if (!option.checked) {
			switch (e.target.value) {
				case "upper":
					isUpper = false;
					rating--;
					break;

				case "lower":
					isLower = false;
					rating--;
					break;
				case "digit":
					isDigit = false;
					rating--;
					break;
				case "symbol":
					isSymbol = false;
					rating--;
					break;
			}
		}
	});
});

// updates the length label according to the user's input
passwordScale.oninput = function () {
	passwordLengthLabel.textContent = `${this.value}  characters`;
	passwordLength = this.value;
	// as the scale changes generate the password and rate it
	const generatedPassword = generatePassword();
	password.textContent = generatedPassword;
	console.log("rating: ", rating);

	let percentage = 0;

	if (rating > 0) {
		// console.log("password length: ", generatedPassword.length);
		percentage = ((rating + generatedPassword.length) / 22) * 100;

		console.log("percentage: ", percentage);
		if (percentage <= 40) {
			passwordRatingScale.style.backgroundColor = "rgb(248 113 113)";
		}
		if (percentage < 60 && percentage > 40) {
			passwordRatingScale.style.backgroundColor = "rgb(250 204 21)";
		}
		if (percentage >= 60) {
			passwordRatingScale.style.backgroundColor = "rgb(34 197 94)";
		}
		passwordRatingScale.style.opacity = 1;
		if (percentage > 100) {
			passwordRatingScale.style.width = `100%`;
		} else {
			passwordRatingScale.style.width = `${percentage}%`;
		}
	} else {
		rating = 0;
		passwordRatingScale.style.width = "0.75rem";
	}
};

// actual password generation

function createBaseSet() {
	const tempSet = [
		...(isDigit ? digitsArray : []),
		...(isSymbol ? symbolsArray : []),
		...(isUpper ? upperCaseCharArray : []),
		...(isLower ? lowerCaseCharArray : []),
	];

	return tempSet;
}

function generatePassword() {
	let password = "";
	const basePasswordSet = createBaseSet();
	// now based on this base set I have to generate the password

	if (basePasswordSet.length == 0 || passwordLength == 0) {
		return "How would you like your password to be?";
	}

	for (let index = 0; index < passwordLength; index++) {
		let randomIndex = Math.floor(Math.random() * basePasswordSet.length);

		password = password.concat(basePasswordSet[randomIndex].toString());
	}

	return password;
}

passwordForm.addEventListener("submit", (e) => {
	e.preventDefault();

	navigator.clipboard
		.writeText(generatedPasswordDisplay.textContent.trim())
		.then(() => {
			// upon successful copy, show password copied.
			// reset the password field after copied
			// generatedPasswordDisplay.textContent = "Copied :D ";
		})
		.catch((e) => {
			console.log(e);
		});
});

// copy to clipboard

copyIcon.addEventListener("click", () => {
	console.log("clicked");
	navigator.clipboard
		.writeText(generatedPasswordDisplay.textContent.trim())
		.then(() => {
			// upon successful copy, show password copied.
			// reset the password field after copied
			generatedPasswordDisplay.textContent = "Copied :D ";
		})
		.catch((e) => {
			console.log(e);
		});
});
