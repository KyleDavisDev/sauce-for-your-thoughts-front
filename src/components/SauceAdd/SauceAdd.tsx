import * as React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { ISauce } from "../../redux/sauces/types";
import { reduxStore } from "../../redux/with-redux-store";
import { addSauce } from "../../redux/sauces/actions";
import { AppState } from "../../redux/configureStore";
import { API } from "../../utils/api/API";
import { IErrReturn } from "../../utils/Err/Err";
import ArrowRight from "../../images/icons/ArrowRight";
import PageTitle from "../PageTitle/PageTitle";
import { Overlay } from "../Overlay/Overlay";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { SauceTitle } from "./components/SauceTitle/SauceTitle";
import SauceDescription from "./components/SauceDescription/SauceDescription";
import SauceIngredients from "./components/SauceIngredients/SauceIngredients";
import SauceType from "./components/SauceType/SauceType";
import SauceSpice from "./components/SauceSpice/SauceSpice";
import SauceReview from "./components/SauceReview/SauceReview";
import SaucePhoto from "./components/SaucePhoto/SaucePhoto";
import { StyledFormContainer, StyledButton } from "./SauceAddStyle";

export interface SauceAddProps {}

const SauceAdd: React.FunctionComponent<SauceAddProps> = () => {
  // set state
  const [name, setName] = React.useState("");
  const [maker, setMaker] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [shu, setShu] = React.useState("");
  const [enabled, setEnabled] = React.useState(false);
  const [photo, setPhoto] = React.useState<File | undefined>();
  const [photoType, setPhotoType] = React.useState<string | undefined>();
  const [isImageLocked, setIsImageLocked] = React.useState(false);
  const [addReview, setAddReview] = React.useState<boolean>(true);
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });
  // assign router
  const router = useRouter();
  // assign redux dispatch
  const useThunkDispatch = useDispatch<typeof reduxStore.dispatch>();

  // get info from redux
  const { author, typesOfSauces, token } = useSelector((store: AppState) => {
    // 1. Find author
    const _author = store.users?.self?.displayName;

    // 2. Find token
    const _token = store.users?.self?.token;

    // 3. Find types of suaces
    const _typesOfSauces: {
      [key: string]: { value: string; checked: boolean; key: string };
    } = {};
    if (store.sauces.types) {
      store.sauces.types.forEach((type, ind) => {
        if (type === "All") return;

        _typesOfSauces[type] = {
          value: type,
          checked: false,
          key: ind + "-" + type
        };
      });
    }

    return { author: _author, token: _token, typesOfSauces: _typesOfSauces };
  });
  const [types, setTypes] = React.useState(typesOfSauces);

  // on mount, verify user is eligible to submit a sauce
  React.useEffect(() => {
    // If we don't have an author, stop
    if (!author) {
      router.push("/account/login?return=/sauce/add");
      return;
    }
    // If no token, stop
    if (!token) {
      router.push("/account/login?return=/sauce/add");
      return;
    }

    // Find out if user is eligible to submit a review for this sauce or not
    API.sauces
      .canUserSubmit()
      .then(() => {
        setEnabled(true);
      })
      .catch((err: IErrReturn) => {
        // authorization failed for some reason, force a relogin
        if (err.response.data.status === 400) {
          router.push("/account/login?return=/sauce/add");
          return;
        }

        // Disable form components and show flashmessage
        setEnabled(false);
        setFlashMessage({
          isVisible: true,
          text: err.response.data.msg
        });
      });
  }, []);

  return (
    <>
      <PageTitle>Add Sauce</PageTitle>
      <StyledFormContainer>
        <form onSubmit={e => onSubmit(e)} style={{ maxWidth: "100%" }}>
          {flashMessage.isVisible && (
            <FlashMessage type={flashMessage.type} isVisible>
              {flashMessage.text}
            </FlashMessage>
          )}
          <Overlay enabled={enabled}>
            {/* Title */}
            <SauceTitle
              onTextChange={e => {
                if (e.target.name === "name") {
                  setName(e.target.value);
                } else {
                  setMaker(e.target.value);
                }
              }}
              name={name}
              maker={maker}
            />

            {/* Official Description */}
            <SauceDescription
              onTextChange={e => setDescription(e.target.value)}
              description={description}
            />

            {/* Ingredients */}
            <SauceIngredients
              onTextChange={e => setIngredients(e.target.value)}
              ingredients={ingredients}
            />

            {/* Type */}
            <SauceType
              typesOfSauces={types}
              onCheckBoxClick={e => onCheckBoxClick(e)}
            />

            {/* Spice */}
            <SauceSpice shu={shu} onTextChange={e => setShu(e.target.value)} />

            {/* Photo */}
            <SaucePhoto
              photo={photo}
              setPhotoType={e => setPhotoType(e)}
              isImageLocked={isImageLocked}
              onImageLock={onImageLock}
              onClearImageClick={onClearImageClick}
              setPhoto={e => setPhoto(e)}
            />

            {/* Review */}
            <SauceReview
              onRadioClick={e => {
                // cast event as htmlinput so we can grab value
                const _target = e.target as HTMLInputElement;
                // look at the value of the element and update option accordingly
                _target.value === "Yes"
                  ? setAddReview(true)
                  : setAddReview(false);
              }}
              addReview={addReview}
            />

            <StyledButton onClick={() => {}} type="submit">
              Submit
              <ArrowRight />
            </StyledButton>
          </Overlay>
        </form>
      </StyledFormContainer>
    </>
  );

  function onCheckBoxClick(event: React.MouseEvent<HTMLInputElement>): void {
    // Cast EventTarget to be HTMLInput Element so we can be sure to have a .value property
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;

    // Grab value from the element
    const value: string = checkbox.value;

    // Get whether checked or not
    const checked: boolean = types[value].checked;

    setTypes({
      ...types,
      [value]: {
        ...types[value],
        value,
        checked: !checked
      }
    });
  }

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    // Get array of checked types
    const _types: string[] = Object.keys(types).filter(
      type => types[type].checked
    );

    // If no user or no token from redux or token expired, stop
    if (!author || !token) {
      router.push("/account/login");
      return;
    }

    // Construct FormData since we are passing image file
    const formData = new FormData();
    // Create expected sauce object
    const sauce: ISauce = {
      author,
      created: 0,
      name,
      maker,
      description,
      ingredients,
      shu,
      types: _types
    };
    formData.append("sauce", JSON.stringify({ sauce }));

    // Append image if available
    if (photo) {
      // append
      formData.append("image", photo);
    }

    try {
      const res = await useThunkDispatch(addSauce({ formData }));

      if (addReview) {
        // Go to review page for specific sauce
        router.push(`/review/add?s=${res}`);
        return; // end
      } else {
        // else, take them to sauce page
        router.push(`/sauce/view?s=${res}`);
        return; //end
      }
    } catch (err) {
      // Move screen to top
      window.scrollTo(0, 0);
      //display error
      setFlashMessage({
        isVisible: true,
        text: err.response.data.msg,
        type: "warning"
      });
    }
  }

  function onImageLock(lock: boolean): void {
    // Update state
    setIsImageLocked(lock);
  }

  function onClearImageClick(): void {
    setIsImageLocked(false);
    setPhoto(undefined);
  }
};

export default SauceAdd;
