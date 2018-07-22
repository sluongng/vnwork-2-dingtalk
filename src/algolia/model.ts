import * as qs from "qs";
import { URL } from "url";

export class AlgoliaSearchParams {
    public query: string;
    public hitsPerPage: number;
    public maxValuesPerFacet: number;
    public page: number;
    public facets: string;
    public tagFilters: string;
    public facetFilters: string;
    public filters: string;

    constructor(
        query: string,
        hitsPerPage: number,
        maxValuesPerFacet: number,
        page: number,
        facets: string[],
        tagFilters: string,
        facetFilters: Array<string | string[]>,
        filters: string,
    ) {
        this.query = query;
        this.hitsPerPage = hitsPerPage;
        this.maxValuesPerFacet = maxValuesPerFacet;
        this.page = page;
        this.facets = qs.stringify(facets);
        this.tagFilters = tagFilters;
        this.facetFilters = qs.stringify(facetFilters);
        this.filters = filters;
    }
}

export class AlgoliaSearchParamsBuilder {
    public query: string;
    public hitsPerPage: number;
    public maxValuesPerFacet: number;
    public page: number;
    public facets: string[];
    public tagFilters: string;
    public facetFilters: Array<string | string[]>;
    public filters: string;

    constructor(query?: string) {
        this.query = query;
    }

    public setQuery(query: string) {
        this.query = query;
        return this;
    }

    public setHitsPerPage(hitsPerPage: number) {
        this.hitsPerPage = hitsPerPage;
        return this;
    }

    public setMaxValuesPerFacet(maxValuesPerFacet: number) {
        this.maxValuesPerFacet = maxValuesPerFacet;
        return this;
    }

    public setPage(page: number) {
        this.page = page;
        return this;
    }

    public setFacets(facets: string[]) {
        this.facets = facets;
        return this;
    }

    public setTagFilters(tagFilters: string) {
        this.tagFilters = tagFilters;
        return this;
    }

    public setFacetFilters(facetFilters: Array<string | string[]>) {
        this.facetFilters = facetFilters;
        return this;
    }

    public setFilters(filters: string) {
        this.filters = filters;
        return this;
    }

    public build() {
        return new AlgoliaSearchParams(
            this.query,
            this.hitsPerPage,
            this.maxValuesPerFacet,
            this.page,
            this.facets,
            this.tagFilters,
            this.facetFilters,
            this.filters,
        );
    }
}

export class AlgoliaSearchResultList {
    public results: AlgoliaSearchResult[];
}

export class AlgoliaSearchResult {
    public exhaustiveFacetsCount: boolean;
    public exhoustiveNbHits: boolean;
    public hits: AlgoliaSearchHit[];
    public hitsPerPage: number;
    public index: string;
    public nbHits: number;
    public nbPages: number;
    public page: number;
    public params: string;
    public processingTimeMS: number;
    public query: string;
}

export class AlgoliaSearchHit {

    public objectID: number;

    // Categories
    public categories: string[];
    public categoryIds: number[];
    public categoryVIs: string[];

    // Search Classification
    public classifiedConfidenceRoles: number[];
    public classifiedConfidenceSkills: number[];
    public classifiedRoles: string[];
    public classifiedSkills: string[];

    // Company Information
    public userId: number;
    public company: string;
    public companyId: number;
    public companyLogo: URL;
    public benefits: Array<{
        benefitInconName: string,
        benefitName: string,
        benefitValue: string,
        benefitId: number,
    }>;

    // Time Stamps
    public timestamp: string;
    public expiredDate: Date;
    public onlineDate: Date;
    public publishedDate: Date;

    public priorityOrder: Date;
    public priorityOrder35: Date;
    public priorityOrder42: Date;
    public priorityOrder55: Date;

    // Post Configuration
    public isPremium: boolean;
    public isPriorityJob: boolean;
    public isSalaryVisible: boolean;
    public visibilityDisplay: boolean;

    // Logo Configration
    public isShowLogo: boolean;
    public isShowLogoInSearchResult: boolean;
    public isShowLogoInSearchResult35: boolean;
    public isShowLogoInSearchResult42: boolean;
    public isShowLogoInSearchResult55: boolean;

    // Job Description
    public jobId: number;
    public jobTitle: string;
    public jobDescription: string;
    public jobRequirement: string;
    public skills: string[];

    public jobLevel: string;
    public jobLevelId: number;
    public jobLevelVI: string;

    public locations: string[];
    public locationIds: number[];
    public locationVIs: string[];

    public jobSalary: number;
    public salaryMax: number;
    public salaryMin: number;
}
