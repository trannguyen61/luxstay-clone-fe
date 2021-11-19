import { ref } from "vue";

export default function () {
  let email = ref("");
  let dirtyEmailField = ref("false");
  let password = ref("");
  let dirtyPasswordField = ref("false");

  const notValidEmail = computed(() => {
    return (
      dirtyEmailField.value == true &&
      email.value.match(/^\S+@\S+\.\S+$/) == null
    );
  });

  const notValidPassword = computed(() => {
    return dirtyPasswordField.value == true && password.value.length < 6;
  });

  const changeEmail = () => {
    dirtyEmailField.value = true;
  };

  const changePassword = () => {
    dirtyPasswordField.value = true;
  };

  return {
    email,
    password,
    notValidEmail,
    notValidPassword,
    changeEmail,
    changePassword,
  };
}
