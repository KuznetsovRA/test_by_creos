import "./Main-page.css";
import CommentList from "../../components/Comments-list/Comment-list.tsx";
import DesignerList from "../../components/Designer-list/Designer-list.tsx";
import SortMenu from "../../components/Sort-menu/Sort-menu.tsx";
import { TypeSortMenu } from "../../types/type-settings-sort.ts";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function MainPage() {
  const [currentCriteria, setCurrentCriteria] = useState<string>(`median-time`);
  const [currentOrder, setCurrentOrder] = useState<string>(`ascending`);
  const { t } = useTranslation();
  const sortMenu: TypeSortMenu[] = [
    {
      head: `Сортировать по`,
      headEng: `sort-criteria`,
      typeSort: [`Медиана времени выполнения`, `Количество задач`],
      typeSortEng: [`median-time`, `tasks-completed`],
      currentValue: currentCriteria,
      handle: setCurrentCriteria,
    },
    {
      head: `Порядок`,
      headEng: `sort-order`,
      typeSort: [`По возрастанию`, `По убыванию`],
      typeSortEng: [`ascending`, `descending`],
      currentValue: currentOrder,
      handle: setCurrentOrder,
    },
  ];

  return (
    <main className="main-page">
      <section className="comments">
        <h2>{t(`lastComments`)}</h2>
        <CommentList />
      </section>
      <section className="top-designers">
        <h2>{t(`top10Designers`)}</h2>
        <SortMenu sortSettings={sortMenu} />
        <DesignerList sortCriteria={currentCriteria} sortOrder={currentOrder} />
      </section>
    </main>
  );
}

export default MainPage;
