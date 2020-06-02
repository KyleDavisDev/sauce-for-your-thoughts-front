import * as React from "react";
import { useRouter } from "next/router";
import shortid from "shortid";
import { useSelector, useDispatch } from "react-redux";

import { ISauce } from "../../redux/sauces/types";
import { reduxStore } from "../../redux/with-redux-store";
import { editSauce } from "../../redux/sauces/actions";
import { AppState } from "../../redux/configureStore";
import { API } from "../../utils/api/API";
import { IErrReturn } from "../../utils/Err/Err";
import ArrowRight from "../../images/icons/ArrowRight";
import TopBar from "../TopBar/TopBar";
import Navigation from "../Navigation/Navigation";
import PageTitle from "../PageTitle/PageTitle";
import Footer from "../Footer/Footer";
import { Overlay } from "../Overlay/Overlay";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { SauceTitle } from "../SauceAdd/components/SauceTitle/SauceTitle";
import SauceDescription from "../SauceAdd/components/SauceDescription/SauceDescription";
import SauceIngredients from "../SauceAdd/components/SauceIngredients/SauceIngredients";
import SauceType from "../SauceAdd/components/SauceType/SauceType";
import SauceSpice from "../SauceAdd/components/SauceSpice/SauceSpice";
import SauceReview from "../SauceAdd/components/SauceReview/SauceReview";
import SaucePhoto from "../SauceAdd/components/SaucePhoto/SaucePhoto";
import { Article, StyledFormContainer, StyledButton } from "./SauceEditStyle";

export interface SauceEditProps {}

const SauceEdit: React.FunctionComponent<SauceEditProps> = () => {
  // assign router
  const router = useRouter();
  // assign redux dispatch
  const useThunkDispatch = useDispatch<typeof reduxStore.dispatch>();

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
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });
  const [canUserEdit, setCanUserEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // get info from redux
  const slug = router.query.s;
  const { author, typesOfSauces, token, sauce, isAdmin } = useSelector(
    (store: AppState) => {
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

      // 4. Find sauce itself
      const _sauce =
        typeof slug === "string" && store.sauces.bySlug
          ? store.sauces.bySlug[slug]
          : undefined;

      // 5. Find if person is admin or not
      const _isAdmin = store.users.self.isAdmin;

      return {
        author: _author,
        token: _token,
        typesOfSauces: _typesOfSauces,
        sauce: _sauce,
        isAdmin: _isAdmin
      };
    }
  );
  const [types, setTypes] = React.useState(typesOfSauces);

  // on mount, verify user is eligible to submit a sauce
  React.useEffect(() => {
    // If we don't have an author, stop
    if (!author) {
      router.push(`/account/login?return=${router.asPath}`);
      return;
    }
    // If no token, stop
    if (!token) {
      router.push(`/account/login?return=${router.asPath}`);
      return;
    }
    // quick sanity check
    if (typeof slug !== "string") {
      return;
    }

    // Find out if user is eligible to edit a sauce
    setLoading(true);
    API.sauce
      .canUserEdit({ data: { sauce: { slug } } })
      .then(() => {
        // This will cause a trigger to go query for information
        setCanUserEdit(true);
      })
      .catch((err: IErrReturn) => {
        // authorization failed for some reason, force a relogin
        if (err.response.data.status === 400) {
          router.push(`/account/login?return=${router.asPath}`);
          return;
        }

        // Disable form components and show flashmessage
        setEnabled(false);
        setFlashMessage({
          isVisible: true,
          text: err.response.data.msg
        });
        setCanUserEdit(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // if user is eligible to submit and we do not already have the sauce, go get it
  React.useEffect(() => {
    async function getSauceInfo() {
      // quick sanity check
      if (typeof slug !== "string") {
        return;
      }

      // get sauce info
      setLoading(true);
      const res = await API.sauce.getBySlug({ slug });

      // update local state
      setName(res.data.sauce.name);
      setMaker(res.data.sauce.maker);
      setDescription(res.data.sauce.description);
      setIngredients(res.data.sauce.ingredients);
      setShu(res.data.sauce.shu);
      let _typesOfSauces = types;
      if (res.data.sauce.types) {
        res.data.sauce.types.forEach(type => {
          _typesOfSauces[type] = { ..._typesOfSauces[type], checked: true };
        });
      }
      setTypes(_typesOfSauces);
      setEnabled(true);
      setLoading(false);
    }

    try {
      if (canUserEdit && !loading && !sauce && !name) {
        getSauceInfo();
      }
    } catch (err) {
      // authorization failed for some reason, force a relogin
      if (err.response.data.status === 400) {
        router.push(`/account/login?return=${router.asPath}`);
        return;
      }

      // Disable form components and show flashmessage
      setEnabled(false);
      setFlashMessage({
        isVisible: true,
        text: err.response.data.msg
      });
      setLoading(false);
    }
  }, [sauce, canUserEdit, loading]);

  return (
    <>
      <TopBar />
      <Navigation />
      <Article>
        <PageTitle>Edit Sauce</PageTitle>
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
                photo={photo}
                setPhotoType={e => setPhotoType(e)}
                isImageLocked={isImageLocked}
                onImageLock={onImageLock}
                onClearImageClick={onClearImageClick}
                setPhoto={e => setPhoto(e)}
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

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    // Get array of checked types
    const _types: string[] = Object.keys(types).filter(
      type => types[type].checked
    );

    // Quick sanity check
    if (!author || !token || typeof slug !== "string") {
      router.push(`/account/login?return=${router.asPath}`);
      return;
    }

    // Construct FormData since we are passing image file
    const formData = new FormData();
    // Create expected suace object
    const sauce: ISauce = {
      author,
      created: 0,
      name,
      maker,
      description,
      ingredients,
      shu,
      slug,
      types: _types
    };
    formData.append("sauce", JSON.stringify({ sauce }));

    // Append image if available
    if (photo) {
      // append
      formData.append("image", photo);
    }

    try {
      const res = await useThunkDispatch(editSauce({ formData }));

      window.scrollTo(0, 0); // Move screen to top

      if (res.data.isGood) {
        setFlashMessage({
          isVisible: true,
          text: "Updated sauce!",
          slugText: isAdmin ? "Back to approved list" : undefined,
          slug: isAdmin ? "/admin/approvesaucesubmissions" : undefined,
          type: "success"
        });
      } else {
        setFlashMessage({
          isVisible: true,
          text: res.data.msg,
          type: "alert"
        });
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

  function onClearImageClick(event: React.MouseEvent<HTMLButtonElement>): void {
    setIsImageLocked(false);
    setPhoto(undefined);
  }
};

export default SauceEdit;
