const casses_list = document.querySelector("#cases__list");
const databaseRef = firebase.database();
databaseRef.ref("portfolio/").on("value", async (snapshot) => {
  const arraySnapshot = Object.values(snapshot.val());
  await arraySnapshot.forEach(async (childSnapshot) => {
    const casses_listInner = document.createElement("a");
    var val = await childSnapshot;
    console.log(val);
    casses_listInner.classList.add("cases__item");
    casses_listInner.classList.add(`${val.device}`);
    casses_listInner.setAttribute("href", `case.html?id=${val.idName}`);
    const tags = val.tags.split("#");
    casses_listInner.innerHTML = `
    <div class="cases__preview ">
    <img class="cases__pic" src="https://picsum.photos/12/9" alt="">
      <div class="cases__box">View</div>
    </div>
    <div class="cases__body">
      <h4 class="cases__info h4">${val.name}</h4>
      <div class="cases__text">${tags.join(", ")}</div>
    </div>`;
    casses_listInner.innerHTML = `
        <div class="cases__preview">
        <img class="cases__pic" src="${val.mainImg}" alt="">
          <div class="cases__box">View</div>
        </div>
        <div class="cases__body">
          <h4 class="cases__info h4">${val.name}</h4>
          <div class="cases__text">${tags.join(", ")}</div>
        </div>`;
    casses_list.appendChild(casses_listInner);
  });
  if (window.innerWidth > 1200) {
    var $container = $(".cases__list");
    $container.isotope({
      filter: "*",
    });
    const cases__navA = document.querySelector(".cases__nav a.active");
    $(document).ready(function () {
      cases__navA.click();
    });
    $(".cases__nav a").click(function () {
      $(".cases__nav .active").removeClass("active");
      $(this).addClass("active");
      var selector = $(this).attr("data-filter");
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 500,
          animationEngine: "jquery",
        },
      });
      return false;
    });
  }
});
