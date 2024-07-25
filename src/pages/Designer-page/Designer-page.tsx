import { TypeSortMenu } from "../../types/type-settings-sort.ts";
import { useEffect, useState } from "react";
import SortMenu from "../../components/Sort-menu/Sort-menu.tsx";
import "./Designer-page.css";
import { TypesDesignerFull } from "../../types/types-data.ts";
import { fetchGetDesignerBySort } from "../../store/api-request-with-params.ts";
import { useTranslation } from "react-i18next";

function DesignerPage() {
  const [currentCriteria, setCurrentCriteria] = useState<string>(`username`);
  const [currentPage, setCurrentPage] = useState<number>(1);
  /*const [currentStatusFilter, setCurrentStatusFilter] = useState<string>(`All`);
  const [currentProjectFilter, setCurrentProjectFilter] =
    useState<string>(`All`);*/
  const [currentOrder, setCurrentOrder] = useState<string>(`ascending`);
  const [currentDesigners, setCurrentDesigners] = useState<TypesDesignerFull[]>(
    [],
  );

  const { t } = useTranslation();

  const handleClickNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleClickPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    throw new Error(`page<1`);
  };

  /*  const sortTypesProjectFilter: string[] = [`All`];
  projects.map((item) => {
    sortTypesProjectFilter.push(item.name);
  });*/
  useEffect(() => {
    fetchGetDesignerBySort(
      `&ordering=${currentOrder === `ascending` ? `` : `-`}${currentCriteria}&limit=10&page=${currentPage}`,
    ).then(setCurrentDesigners);
  }, [currentCriteria, currentOrder, currentPage]);

  const sortMenu: TypeSortMenu[] = [
    {
      head: `Сортировать по`,
      headEng: `sort-criteria`,
      typeSort: [`Имени дизайнера`, `По почте`],
      typeSortEng: [`username`, `email`],
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
  /*const filterMenu: TypeSortMenu[] = [
    {
      head: `Фильтр по статусам`,
      headEng: `statusFilter`,
      typeSort: [`Все`, `Закрытые`, `В процессе`, `Новые`],
      typeSortEng: [`All`, `closed`, `in-progress`, `New`],
      currentValue: currentStatusFilter,
      handle: setCurrentStatusFilter,
    },
    {
      head: `Фильтр по проектам`,
      headEng: `projectFilter`,
      typeSort: sortTypesProjectFilter,
      typeSortEng: sortTypesProjectFilter,
      currentValue: currentProjectFilter,
      handle: setCurrentProjectFilter,
    },
  ];*/

  return (
    <main className="designer-page">
      <h1 className="visually-hidden">Страница дизайнера</h1>
      <section className="designer-table">
        <h2>{t(`TableDesigners`)}</h2>
        <SortMenu sortSettings={sortMenu} />
        {/*<SortMenu sortSettings={filterMenu} />*/}
        <table>
          <thead>
            <tr>
              <th>{t(`avatar`)}</th>
              <th>{t(`username`)}</th>
              <th>{t(`email`)}</th>
              <th>{t(`closedTasks`)}</th>
              <th>{t(`inProgressTasks`)}</th>
            </tr>
          </thead>
          <tbody id="designerTableBody">
            {currentDesigners?.map((designer) => {
              return (
                <tr key={designer.username}>
                  <td>
                    <img
                      src={designer.avatar}
                      alt={designer.username + `s avatar`}
                      className="avatar"
                    />
                  </td>
                  <td>{designer.username}</td>
                  <td>{designer.email}</td>
                  <td>
                    {
                      designer.issues.filter((issue) => issue.status === "Done")
                        .length
                    }
                  </td>
                  <td>
                    {
                      designer.issues.filter(
                        (issue) => issue.status === "In Progress",
                      ).length
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button
            id="prevPage"
            disabled={currentPage === 1}
            onClick={handleClickPrevPage}
          >
            {t(`previous`)}
          </button>
          <span id="currentPage">{currentPage}</span>
          <button id="nextPage" onClick={handleClickNextPage}>
            {t(`next`)}
          </button>
        </div>
      </section>
    </main>
  );
}

export default DesignerPage;
