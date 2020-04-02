import * as React from "react";
import shortid from "shortid";
import { useSelector } from "react-redux";

import { SauceTitle } from "./components/SauceTitle/SauceTitle";
import SauceDescription from "./components/SauceDescription/SauceDescription";
import SauceIngredients from "./components/SauceIngredients/SauceIngredients";
import SauceType from "./components/SauceType/SauceType";
import SauceSpice from "./components/SauceSpice/SauceSpice";
import SauceReview from "./components/SauceReview/SauceReview";
import SaucePhoto from "./components/SaucePhoto/SaucePhoto";
import TopBar from "../TopBar/TopBar";
import Navigation from "../Navigation/Navigation";
import PageTitle from "../PageTitle/PageTitle";
import Footer from "../Footer/Footer";
import { Overlay } from "../Overlay/Overlay";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { ISauce } from "../../redux/sauces/types";
import ArrowRight from "../../images/icons/ArrowRight";
import { AppState } from "../../redux/configureStore";
import { API } from "../../utils/api/API";
import { IErrReturn } from "../../utils/Err/Err";
import { Article, StyledFormContainer, StyledButton } from "./SauceAddStyle";
import { useRouter } from "next/router";

export interface SauceAddProps {
  addSauce?: ({ formData }: { formData: FormData }) => Promise<any>;
  history?: {
    replace: (location: string) => any;
    push: (location: string) => any;
  };
  user?: { token: string; name: string };
  types?: string[];
}

export interface SauceAddState extends ISauce {
  typesOfSauces: {
    [key: string]: { value: string; checked: boolean; key: string };
  };
  country: string;
  city: string;
  state: string;
  cropperOptions: {
    zoomOnWheel?: boolean;
    aspectRatio?: number;
    movable: boolean;
  };
  DropNCropValue: any;
  isImageLocked: boolean;
  addReview: boolean;
  flashMessage: FlashMessageProps;
  enabled: boolean;
}

const SauceAdd: React.FunctionComponent<SauceAddProps> = () => {
  // set state
  const [name, setName] = React.useState("");
  const [maker, setMaker] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [] = React.useState("");
  const [shu, setShu] = React.useState("");
  const [country, setCountry] = React.useState("United States");
  const [state, setState] = React.useState();
  const [city, setCity] = React.useState();
  const [enabled, setEnabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // get info from redux
  const { author, typesOfSauces, token } = useSelector((store: AppState) => {
    // 1. Find author
    const _author = store.users.self.displayName;

    // 2. Find token
    const _token = store.users.self.token;

    // 3. Find types of suaces
    const _typesOfSauces: {
      [key: string]: { value: string; checked: boolean; key: string };
    } = {};
    if (store.sauces.types) {
      store.sauces.types.forEach(type => {
        if (type === "All") {
          // continue;
        } else {
          _typesOfSauces[type] = {
            value: type,
            checked: false,
            key: shortid.generate()
          };
        }
      });
    }

    return { author: _author, token: _token, typesOfSauces: _typesOfSauces };
  });

  const [types, setTypes] = React.useState(typesOfSauces);
  const [dropNCropValue, setDropNCropValue] = React.useState({});
  const cropperOptions = {
    zoomOnWheel: false,
    aspectRatio: 2 / 3,
    movable: true
  };
  const [isImageLocked, setIsImageLocked] = React.useState(false);
  const [addReview, setAddReview] = React.useState(true);
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });
  // created: new Date(),

  // assign router
  const router = useRouter();

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

    // Construct data obj
    const data = { user: { token } };

    // Find out if user is eligible to submit a review for this sauce or not
    API.sauces
      .canUserSubmit({ data })
      .then(() => {
        setEnabled(true);
      })
      .catch((err: IErrReturn) => {
        // authorization failed for some reason, force a relogin
        if (err.response.data.status === 401) {
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
      <TopBar />
      <Navigation />
      <Article>
        <PageTitle>Add Sauce</PageTitle>
        <StyledFormContainer>
          <form onSubmit={e => onSubmit()} style={{ maxWidth: "100%" }}>
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
              <SauceSpice
                shu={shu}
                onTextChange={e => setShu(e.target.value)}
              />

              {/* Location */}
              {/* <SauceLocation
                  state={state}
                  city={city}
                  country={country}
                  onTextChange={e => (e.target.value)}
                  onCountryChange={e => setCountry(e.target.value)}
                  onStateChange={e => setState(e.target.value)}
                /> */}

              {/* Photo */}
              <SaucePhoto
                // DropNCropValue={dropNCropValue}
                cropperOptions={cropperOptions}
                isImageLocked={isImageLocked}
                // onDropNCropChange={onDropNCropChange}
                onImageLock={onImageLock}
                onClearImageClick={onClearImageClick}
              />

              {/* Review */}
              <SauceReview
                onRadioClick={e => console.log(e.target)}
                addReview={addReview}
              />

              <StyledButton onClick={() => {}} type="submit">
                Submit
                <ArrowRight />
              </StyledButton>
            </Overlay>
          </form>
        </StyledFormContainer>
      </Article>
      <Footer />
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

  // function onCountryChange(val: string) {
  //   this.setState({
  //     ...this.state,
  //     country: val
  //   });
  // };

  // function onStateChange(val: string) {
  //   this.setState({
  //     ...this.state,
  //     state: val
  //   });
  // };

  function onDropNCropChange(val: any) {
    setDropNCropValue(val);
  }

  function onSubmit(): void {
    // event.preventDefault();
    // // Get array of checked types
    // const types: string[] = Object.keys(this.state.typesOfSauces).filter(
    //   type => this.state.typesOfSauces[type].checked
    // );
    // const { user, history } = this.props;
    // // If no history, stop
    // if (!history) {
    //   window.location.href = "/account/login";
    //   return;
    // }
    // // If no user, stop
    // if (!user) {
    //   history.push("/account/login");
    //   return;
    // }
    // // make sure token is still good/not expired
    // if (!Auth.isUserAuthenticated()) history.push("/account/login");
    // // Grab values
    // const {
    //   name,
    //   maker,
    //   description,
    //   ingredients,
    //   shu,
    //   author,
    //   country,
    //   state,
    //   city
    // } = this.state;
    // const token = user.token;
    // if (!token) history.push("/account/login");
    // // Construct FormData since we are passing image file
    // const formData = new FormData();
    // // Create expected suace object
    // const sauce: ISauce = {
    //   author,
    //   created: new Date(),
    //   name,
    //   maker,
    //   description,
    //   ingredients,
    //   shu,
    //   country,
    //   state,
    //   city,
    //   types
    // };
    // formData.append("sauce", JSON.stringify({ sauce }));
    // // Append user
    // formData.append("user", JSON.stringify({ user: { token } }));
    // // Append image if available
    // if (this.state.DropNCropValue.result) {
    //   // const lastModified = this.state.DropNCropValue.files[0].lastModified;
    //   const fileType = this.state.DropNCropValue.filetype;
    //   const blob = this.dataURItoBlob(this.state.DropNCropValue.result);
    //   const image = new File([blob], "image.png", {
    //     type: fileType
    //   });
    //   // append
    //   formData.append("image", image);
    // }
    // if (this.props.addSauce) {
    //   this.props
    //     .addSauce({ formData })
    //     .then(res => {
    //       // Go to sauce page if they do not want to add a review
    //       if (this.state.addReview === false) {
    //         history.push(`/sauce?s=${res}`);
    //       } else {
    //         // Go to review page for specific sauce
    //         history.push(`/review/add?s=${res}`);
    //       }
    //     })
    //     .catch(err => {
    //       // TODO better error handling
    //       // Move screen to top
    //       window.scrollTo(0, 0);
    //       // Create warning flash
    //       this.setState({
    //         ...this.state,
    //         flashMessage: {
    //           isVisible: true,
    //           text: err.response.data.msg,
    //           type: "warning"
    //         }
    //       });
    //     });
    // } else {
    //   // error window?
    // }
  }

  function onImageLock(lock: boolean): void {
    // Update state
    setIsImageLocked(lock);
  }

  function onClearImageClick(event: React.MouseEvent<HTMLButtonElement>): void {
    setIsImageLocked(false);
    setDropNCropValue({});
  }
};

export default SauceAdd;
