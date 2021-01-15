import * as React from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { ISauce } from "../../redux/sauces/types";
import { reduxStore } from "../../redux/with-redux-store";
import { editSauce } from "../../redux/sauces/actions";
import { AppState } from "../../redux/configureStore";
import { API } from "../../utils/api/API";
import { IErrReturn } from "../../utils/Err/Err";
import ArrowRight from "../../images/icons/ArrowRight";
import PageTitle from "../PageTitle/PageTitle";
import { Overlay } from "../Overlay/Overlay";
import { FlashMessageProps, FlashMessage } from "../FlashMessage/FlashMessage";
import { SauceTitle } from "../SauceAdd/components/SauceTitle/SauceTitle";
import SauceDescription from "../SauceAdd/components/SauceDescription/SauceDescription";
import SauceIngredients from "../SauceAdd/components/SauceIngredients/SauceIngredients";
import SauceType from "../SauceAdd/components/SauceType/SauceType";
import SauceSpice from "../SauceAdd/components/SauceSpice/SauceSpice";
import SaucePhoto from "../SauceAdd/components/SaucePhoto/SaucePhoto";
import { StyledFormContainer, StyledButton } from "./SauceEditStyle";

export interface SauceEditProps {}

const SauceEdit: React.FunctionComponent<SauceEditProps> = () => {
  // assign router
  const router = useRouter();
  // assign redux dispatch
  const useThunkDispatch = useDispatch<typeof reduxStore.dispatch>();

  // set state
  const [sauceItem, setSauceItem] = React.useState<ISauce>();
  const [photo, setPhoto] = React.useState<File | undefined>();
  const [photoType, setPhotoType] = React.useState<string | undefined>();
  const [flashMessage, setFlashMessage] = React.useState<FlashMessageProps>({
    isVisible: false
  });

  // set meta
  const [canUserEdit, setCanUserEdit] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isImageLocked, setIsImageLocked] = React.useState(false);

  // get info from redux
  const slug = router.query.s;
  const { author, typesOfSauces, token, isAdmin } = useSelector(
    (store: AppState) => {
      // 1. Find author
      const _author = store.users.self?.displayName;

      // 2. Find token
      const _token = store.users.self?.token;

      // 3. Find types of suaces
      const _typesOfSauces: {
        [key: string]: { value: string; checked: boolean; key: string };
      } = {};
      if (store.sauces.types) {
        store.sauces.types.forEach((type, ind) => {
          if (type === "All") {
            // continue;
          } else {
            _typesOfSauces[type] = {
              value: type,
              checked: false,
              key: `${ind}-${type}`
            };
          }
        });
      }

      // 4. Find if person is admin or not
      const _isAdmin = store.users.self?.isAdmin;

      return {
        author: _author,
        token: _token,
        typesOfSauces: _typesOfSauces,
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
    // function to turn URL string into a file
    const createFile = async (url: string) => {
      // 1) Fetch the photo and turn to blob
      const response = await fetch(url);
      const _data = await response.blob();

      // 2) Get the name of the photo and image type by splitting apart the url
      const _name = url.split("/")[url.split("/").length - 1];
      const _metaData = {
        type: "image/" + _name.split(".")[_name.split(".").length - 1]
      };

      // 3) Turn blob into file w/ appropriate name
      const file = new File([_data], _name, _metaData);

      // 4) Return file
      return file;
    };

    // function to go out and get info about a specific sauce
    const getSauceInfo = async () => {
      // quick sanity check
      if (typeof slug !== "string") {
        return;
      }

      // get sauce info
      setLoading(true);
      const res = await API.sauce.getBySlug({ slug });

      // update local state
      setSauceItem({ ...res.data.sauce });
      let _typesOfSauces = types;
      if (res.data.sauce.types) {
        res.data.sauce.types.forEach(type => {
          _typesOfSauces[type] = { ..._typesOfSauces[type], checked: true };
        });
      }
      setTypes(_typesOfSauces);
      setEnabled(true);
      setLoading(false);
      if (res.data.sauce.photo) {
        const file = await createFile(res.data.sauce.photo);
        setPhoto(file);
      }
    };

    try {
      // Only call API if person is eligible,
      // we are not already loading something,
      // and a sauce has not already been found
      if (canUserEdit && !loading && !sauceItem) {
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
      setLoading(false);
      setFlashMessage({
        isVisible: true,
        text: err.response.data.msg
      });
    }
  }, [sauceItem, canUserEdit, loading]);

  return (
    <>
      <PageTitle>Edit Sauce</PageTitle>
      <StyledFormContainer>
        <form onSubmit={e => onSubmit(e)} style={{ maxWidth: "100%" }}>
          {flashMessage.isVisible && (
            <FlashMessage {...flashMessage}>{flashMessage.text}</FlashMessage>
          )}
          <Overlay enabled={enabled}>
            {sauceItem ? (
              <>
                {/* Title */}
                <SauceTitle
                  onTextChange={e => {
                    if (e.target.name === "name") {
                      const _tmp = e.target.value as string;
                      setSauceItem({ ...sauceItem, name: _tmp });
                    } else {
                      const _tmp = e.target.value as string;
                      setSauceItem({ ...sauceItem, maker: _tmp });
                    }
                  }}
                  name={sauceItem.name}
                  maker={sauceItem.maker}
                />

                {/* Official Description */}
                <SauceDescription
                  onTextChange={e =>
                    setSauceItem({
                      ...sauceItem,
                      description: e.target.value
                    })
                  }
                  description={sauceItem.description}
                />

                {/* Ingredients */}
                <SauceIngredients
                  onTextChange={e =>
                    setSauceItem({
                      ...sauceItem,
                      ingredients: e.target.value
                    })
                  }
                  ingredients={sauceItem.ingredients}
                />

                {/* Type */}
                <SauceType
                  typesOfSauces={types}
                  onCheckBoxClick={e => onCheckBoxClick(e)}
                />

                {/* Spice */}
                <SauceSpice
                  shu={sauceItem.shu}
                  onTextChange={e =>
                    setSauceItem({
                      ...sauceItem,
                      shu: e.target.value
                    })
                  }
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
                  enabled={false}
                  setPhoto={e => setPhoto(e)}
                />

                <StyledButton onClick={() => {}} type="submit">
                  Update
                  <ArrowRight />
                </StyledButton>
              </>
            ) : (
              <p>Could not find sauce....</p>
            )}
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

    // Quick sanity check
    if (!author || !token || !sauceItem || typeof slug !== "string") {
      router.push(`/account/login?return=${router.asPath}`);
      return;
    }

    // Construct FormData since we are passing image file
    const formData = new FormData();
    // Create expected suace object
    const sauce: ISauce = {
      ...sauceItem,
      author,
      created: 0,
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
      // Update sauce
      const res = await useThunkDispatch(editSauce({ formData }));

      // Move screen to top
      window.scrollTo(0, 0);

      // Decide which flash message to show
      if (res?.data?.isGood) {
        setFlashMessage({
          isVisible: true,
          text: "Updated sauce!",
          slugText: isAdmin ? "Back to approved list" : undefined,
          slug: isAdmin ? "/admin/sauces/approve" : undefined,
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
